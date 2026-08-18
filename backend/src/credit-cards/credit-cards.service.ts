import { Injectable } from '@nestjs/common';
import { addMonths, startOfMonth } from 'date-fns';
import { InstallmentStatus, InvoiceStatus, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { money, roundMoney, toNumber } from '../common/utils/money';

@Injectable()
export class CreditCardsService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------- Cartões ----------

  async list(userId: string) {
    const cards = await this.prisma.creditCard.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'asc' },
    });
    return Promise.all(cards.map((card) => this.withUtilization(userId, card)));
  }

  async getOwned(userId: string, id: string) {
    const card = await this.prisma.creditCard.findFirst({ where: { id, userId } });
    if (!card) throw new AppException('CARD_NOT_FOUND', 'Cartão não encontrado.', 404);
    return card;
  }

  async create(userId: string, dto: { name: string; institution?: string; limit: number; closingDay: number; dueDay: number }) {
    return this.prisma.creditCard.create({
      data: { userId, ...dto, limit: money(dto.limit) },
    });
  }

  async update(userId: string, id: string, dto: Prisma.CreditCardUpdateInput) {
    await this.getOwned(userId, id);
    return this.prisma.creditCard.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    await this.getOwned(userId, id);
    const usage = await this.prisma.creditCardInstallment.count({
      where: { cardId: id, status: { in: ['PENDING', 'OVERDUE'] } },
    });
    if (usage > 0) {
      return this.prisma.creditCard.update({ where: { id }, data: { isActive: false } });
    }
    await this.prisma.creditCard.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Utilização do limite:
   * - utilizado = soma das parcelas não pagas (PENDING/OVERDUE)
   * - disponível = limite - utilizado
   * - comprometimento futuro = % do limite comprometido
   */
  async withUtilization(userId: string, card: { id: string; limit: Prisma.Decimal }) {
    const committed = await this.prisma.creditCardInstallment.aggregate({
      where: { cardId: card.id, userId, status: { in: ['PENDING', 'OVERDUE'] } },
      _sum: { amount: true },
    });
    const used = committed._sum.amount ?? money(0);
    const limit = money(card.limit);
    const available = limit.minus(used).lt(0) ? money(0) : limit.minus(used);
    return {
      ...card,
      usedAmount: roundMoney(used),
      availableAmount: roundMoney(available),
      utilizationPercent: limit.isZero() ? 0 : roundMoney(used.div(limit).mul(100)),
    };
  }

  // ---------- Faturas ----------

  async getOrCreateInvoice(userId: string, cardId: string, year: number, month: number) {
    const card = await this.getOwned(userId, cardId);
    const existing = await this.prisma.creditCardInvoice.findUnique({
      where: { cardId_referenceMonth_referenceYear: { cardId, referenceMonth: month, referenceYear: year } },
    });
    if (existing) return existing;

    const closingDate = new Date(year, month - 1, card.closingDay);
    const dueDate = new Date(year, month - 1, card.dueDay);
    if (dueDate < closingDate) dueDate.setMonth(dueDate.getMonth() + 1);

    return this.prisma.creditCardInvoice.create({
      data: {
        cardId,
        userId,
        referenceMonth: month,
        referenceYear: year,
        closingDate,
        dueDate,
      },
    });
  }

  async syncInvoiceAmount(invoiceId: string) {
    const total = await this.prisma.creditCardInstallment.aggregate({
      where: { invoiceId, status: { in: ['PENDING', 'OVERDUE'] } },
      _sum: { amount: true },
    });
    return this.prisma.creditCardInvoice.update({
      where: { id: invoiceId },
      data: { amount: total._sum.amount ?? money(0) },
    });
  }

  async listInvoices(userId: string, cardId: string, limit = 12) {
    await this.getOwned(userId, cardId);
    return this.prisma.creditCardInvoice.findMany({
      where: { cardId, userId },
      orderBy: [{ referenceYear: 'desc' }, { referenceMonth: 'desc' }],
      take: limit,
    });
  }

  /** Fatura atual = fatura OPEN com maior data de vencimento futura. */
  async currentInvoice(userId: string, cardId: string) {
    await this.getOwned(userId, cardId);
    const now = new Date();
    const current = await this.prisma.creditCardInvoice.findFirst({
      where: { cardId, userId, status: 'OPEN', dueDate: { gte: now } },
      orderBy: { dueDate: 'asc' },
    });
    return current ?? null;
  }

  async payInvoice(userId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: { id: invoiceId, userId },
    });
    if (!invoice) throw new AppException('INVOICE_NOT_FOUND', 'Fatura não encontrada.', 404);

    await this.prisma.$transaction([
      this.prisma.creditCardInvoice.update({
        where: { id: invoiceId },
        data: { status: 'PAID', paidAt: new Date() },
      }),
      this.prisma.creditCardInstallment.updateMany({
        where: { invoiceId, status: { in: ['PENDING', 'OVERDUE'] } },
        data: { status: 'PAID', paidAt: new Date() },
      }),
    ]);
    return this.prisma.creditCardInvoice.findUnique({ where: { id: invoiceId } });
  }

  // ---------- Compras / Parcelas ----------

  /**
   * Cria a compra e gera as parcelas, distribuindo cada uma na fatura do mês
   * correspondente. O valor total NUNCA é lançado de uma vez no saldo —
   * cada parcela compromete apenas o período da sua fatura.
   */
  async createPurchase(userId: string, cardId: string, dto: { description: string; amount: number; categoryId?: string; purchaseDate?: string; installments: number }) {
    const card = await this.getOwned(userId, cardId);
    const total = money(dto.amount);
    const count = dto.installments;
    const baseInstallment = total.div(count);
    const purchaseDate = dto.purchaseDate ? new Date(dto.purchaseDate) : new Date();
    const firstDue = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), card.dueDay);
    if (firstDue <= purchaseDate) firstDue.setMonth(firstDue.getMonth() + 1);

    return this.prisma.$transaction(async (tx) => {
      const purchase = await tx.creditCardPurchase.create({
        data: {
          cardId,
          userId,
          categoryId: dto.categoryId,
          description: dto.description,
          amount: total,
          purchaseDate,
          installmentCount: count,
        },
      });

      // Distribuição com arredondamento: a última parcela absorve a diferença.
      const remainder = total.minus(baseInstallment.times(count));
      const installments = [];
      for (let i = 0; i < count; i++) {
        const amount = i === count - 1 ? baseInstallment.plus(remainder) : baseInstallment;
        const due = addMonths(firstDue, i);
        const invoice = await tx.creditCardInvoice.findUnique({
          where: {
            cardId_referenceMonth_referenceYear: {
              cardId,
              referenceMonth: due.getMonth() + 1,
              referenceYear: due.getFullYear(),
            },
          },
        });
        const invoiceId = invoice?.id ?? (
          await tx.creditCardInvoice.create({
            data: {
              cardId,
              userId,
              referenceMonth: due.getMonth() + 1,
              referenceYear: due.getFullYear(),
              closingDate: new Date(due.getFullYear(), due.getMonth(), card.closingDay),
              dueDate: due,
            },
          })
        ).id;

        installments.push(
          await tx.creditCardInstallment.create({
            data: {
              purchaseId: purchase.id,
              cardId,
              userId,
              invoiceId,
              number: i + 1,
              amount: roundMoney(amount),
              dueDate: due,
            },
          }),
        );
      }

      // Recalcula o valor das faturas afetadas.
      const invoiceIds = [...new Set(installments.map((i) => i.invoiceId).filter((id): id is string => Boolean(id)))];
      for (const invoiceId of invoiceIds) {
        const sum = await tx.creditCardInstallment.aggregate({
          where: { invoiceId, status: { in: ['PENDING', 'OVERDUE'] } },
          _sum: { amount: true },
        });
        await tx.creditCardInvoice.update({
          where: { id: invoiceId },
          data: { amount: sum._sum.amount ?? money(0) },
        });
      }

      return purchase;
    });
  }

  async listPurchases(userId: string, cardId: string) {
    await this.getOwned(userId, cardId);
    return this.prisma.creditCardPurchase.findMany({
      where: { cardId, userId },
      include: { installments: { orderBy: { number: 'asc' } }, category: true },
      orderBy: { purchaseDate: 'desc' },
    });
  }

  async listInstallments(userId: string, cardId: string, status?: InstallmentStatus) {
    await this.getOwned(userId, cardId);
    return this.prisma.creditCardInstallment.findMany({
      where: { cardId, userId, ...(status ? { status } : {}) },
      orderBy: { dueDate: 'asc' },
    });
  }

  /** Compromissos futuros de cartões para os próximos N dias (usado no can-i-spend / dashboard). */
  async upcomingCommitments(userId: string, from: Date, to: Date) {
    return this.prisma.creditCardInstallment.findMany({
      where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: from, lte: to } },
      include: { card: true, invoice: true },
      orderBy: { dueDate: 'asc' },
    });
  }

  async invoiceDetail(userId: string, invoiceId: string) {
    const invoice = await this.prisma.creditCardInvoice.findFirst({
      where: { id: invoiceId, userId },
      include: {
        installments: {
          include: { purchase: { include: { category: true } } },
          orderBy: { number: 'asc' },
        },
      },
    });
    if (!invoice) throw new AppException('INVOICE_NOT_FOUND', 'Fatura não encontrada.', 404);
    return invoice;
  }
}