import { Injectable } from '@nestjs/common';
import { addMonths } from 'date-fns';
import {
  Debt,
  DebtPriority,
  DebtStatus,
  DebtType,
  InstallmentStatus,
  InterestType,
  Prisma,
} from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { money, roundMoney } from '../common/utils/money';

@Injectable()
export class DebtsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly ACTIVE_STATUSES: DebtStatus[] = ['ACTIVE', 'OVERDUE', 'NEGOTIATED'];

  // ---------- CRUD ----------

  async list(userId: string, filters: { status?: string; type?: string; priority?: string }) {
    const debts = await this.prisma.debt.findMany({
      where: {
        userId,
        ...(filters.status ? { status: filters.status as DebtStatus } : {}),
        ...(filters.type ? { type: filters.type as DebtType } : {}),
        ...(filters.priority ? { priority: filters.priority as DebtPriority } : {}),
      },
      include: {
        installments: {
          where: { status: { in: ['PENDING', 'OVERDUE'] } },
          orderBy: { dueDate: 'asc' },
          take: 1,
        },
      },
      orderBy: [{ status: 'asc' }, { dueDate: 'asc' }],
    });

    return debts.map((debt) => this.decorate(debt));
  }

  async overview(userId: string) {
    const [activeAgg, paidOffAgg, byStatus] = await Promise.all([
      this.prisma.debt.aggregate({
        where: { userId, status: { in: this.ACTIVE_STATUSES } },
        _sum: { currentBalance: true, originalAmount: true },
      }),
      this.prisma.debt.aggregate({
        where: { userId, status: 'PAID_OFF' },
        _sum: { currentBalance: true },
      }),
      this.prisma.debt.groupBy({
        by: ['status'],
        where: { userId },
        _count: { _all: true },
      }),
    ]);

    return {
      totalBalance: roundMoney(activeAgg._sum.currentBalance ?? 0),
      totalOriginal: roundMoney(activeAgg._sum.originalAmount ?? 0),
      paidOffTotal: roundMoney(paidOffAgg._sum.currentBalance ?? 0),
      counts: byStatus,
    };
  }

  async getOwned(userId: string, id: string) {
    const debt = await this.prisma.debt.findFirst({ where: { id, userId } });
    if (!debt) throw new AppException('DEBT_NOT_FOUND', 'Dívida não encontrada.', 404);
    return debt;
  }

  async detail(userId: string, id: string) {
    const debt = await this.prisma.debt.findFirst({
      where: { id, userId },
      include: {
        installments: { orderBy: [{ status: 'asc' }, { dueDate: 'asc' }] },
        payments: { orderBy: { paymentDate: 'desc' } },
      },
    });
    if (!debt) throw new AppException('DEBT_NOT_FOUND', 'Dívida não encontrada.', 404);
    return this.decorate(debt);
  }

  async create(userId: string, dto: CreateDebtLike) {
    const original = money(dto.originalAmount);
    const balance = dto.currentBalance !== undefined ? money(dto.currentBalance) : original;

    const debt = await this.prisma.$transaction(async (tx) => {
      const created = await tx.debt.create({
        data: {
          userId,
          creditor: dto.creditor,
          type: dto.type as DebtType,
          originalAmount: original,
          currentBalance: balance,
          interestRate: dto.interestRate ?? 0,
          interestType: (dto.interestType as InterestType) ?? 'ANNUAL',
          penaltyRate: dto.penaltyRate ?? 0,
          installmentAmount: dto.installmentAmount ? money(dto.installmentAmount) : null,
          totalInstallments: dto.totalInstallments ?? null,
          dueDate: new Date(dto.dueDate),
          status: (dto.status as DebtStatus) ?? 'ACTIVE',
          priority: (dto.priority as DebtPriority) ?? 'MEDIUM',
          notes: dto.notes,
        },
      });

      if (dto.totalInstallments && dto.totalInstallments > 1) {
        await this.generateSchedule(tx, created.id, userId, balance, dto.totalInstallments);
      }

      return created;
    });

    return this.detail(userId, debt.id);
  }

  /**
   * Gera o cronograma de parcelas com abertura de principal, juros e total.
   * A última parcela absorve a diferença de arredondamento.
   */
  private async generateSchedule(
    tx: Prisma.TransactionClient,
    debtId: string,
    userId: string,
    balance: Prisma.Decimal,
    totalInstallments: number,
  ) {
    const base = balance.div(totalInstallments);
    const remainder = balance.minus(base.times(totalInstallments));
    const monthlyRate = 0; // juros são apropriados mensalmente pelo job (evita juros sobre juros no cronograma)

    for (let i = 0; i < totalInstallments; i++) {
      const principal = i === totalInstallments - 1 ? base.plus(remainder) : base;
      const interest = principal.times(monthlyRate);
      const total = principal.plus(interest);
      await tx.debtInstallment.create({
        data: {
          debtId,
          userId,
          installmentNumber: i + 1,
          dueDate: addMonths(new Date(), i + 1),
          principalAmount: roundMoney(principal),
          interestAmount: roundMoney(interest),
          penaltyAmount: money(0),
          totalAmount: roundMoney(total),
          paidAmount: money(0),
        },
      });
    }
  }

  async update(userId: string, id: string, dto: Prisma.DebtUpdateInput) {
    await this.getOwned(userId, id);
    return this.prisma.debt.update({ where: { id }, data: dto });
  }

  /** Soft delete: dívidas com histórico são canceladas, nunca apagadas fisicamente. */
  async remove(userId: string, id: string) {
    await this.getOwned(userId, id);
    const hasPayments = await this.prisma.debtPayment.count({ where: { debtId: id } });
    if (hasPayments > 0) {
      return this.prisma.debt.update({ where: { id }, data: { status: 'CANCELED' } });
    }
    await this.prisma.debt.delete({ where: { id } });
    return { deleted: true };
  }

  // ---------- Pagamentos ----------

  /**
   * Registra pagamento e aloca em parcelas: ATRASADAS primeiro (por vencimento),
   * depois PENDENTES. Dentro de cada parcela, a ordem é: multa → juros → principal.
   * Reduz currentBalance apenas pela parcela de principal (auditável).
   */
  async registerPayment(userId: string, debtId: string, dto: { amount: number; paymentDate?: string; installmentId?: string; note?: string }) {
    const debt = await this.getOwned(userId, debtId);
    const amount = money(dto.amount);
    if (amount.isZero()) throw new AppException('INVALID_AMOUNT', 'Valor do pagamento deve ser maior que zero.');

    let remaining = amount;
    let principalPaid = money(0);
    let interestPaid = money(0);
    let penaltyPaid = money(0);
    let paidCount = 0;
    let nextInstallmentId: string | null = dto.installmentId ?? null;

    const installments = nextInstallmentId
      ? [await this.prisma.debtInstallment.findFirst({ where: { id: nextInstallmentId, debtId } })]
      : await this.prisma.debtInstallment.findMany({
          where: { debtId, status: { in: ['OVERDUE', 'PENDING'] } },
          orderBy: [{ status: 'desc' }, { dueDate: 'asc' }],
        });

    if (!nextInstallmentId && installments.length === 0) {
      throw new AppException('DEBT_INSTALLMENT_NOT_FOUND', 'Esta dívida não possui parcelas pendentes.');
    }
    if (installments[0] === null) {
      throw new AppException('DEBT_INSTALLMENT_NOT_FOUND', 'Parcela não encontrada.', 404);
    }

    const result = await this.prisma.$transaction(async (tx) => {
      for (const installment of installments as NonNullable<typeof installments[0]>[]) {
        if (remaining.lte(0)) break;
        const owed = installment.totalAmount.minus(installment.paidAmount);
        if (owed.lte(0)) continue;

        const paid = remaining.lt(owed) ? remaining : owed;

        // Alocação dentro da parcela: multa → juros → principal
        const penaltyOwed = money(installment.penaltyAmount).sub(money(installment.paidAmount));
        const allocatedPenalty = paid.lt(penaltyOwed) ? paid : penaltyOwed;
        const interestOwed = money(installment.interestAmount);
        const afterPenalty = paid.sub(allocatedPenalty);
        const allocatedInterest = afterPenalty.lt(interestOwed) ? afterPenalty : interestOwed;
        const allocatedPrincipal = afterPenalty.sub(allocatedInterest);

        penaltyPaid = penaltyPaid.plus(allocatedPenalty);
        interestPaid = interestPaid.plus(allocatedInterest);
        principalPaid = principalPaid.plus(allocatedPrincipal);

        const newPaidAmount = installment.paidAmount.plus(paid);
        const fullyPaid = newPaidAmount.gte(installment.totalAmount.minus(0.004));

        await tx.debtInstallment.update({
          where: { id: installment.id },
          data: {
            paidAmount: roundMoney(newPaidAmount),
            status: fullyPaid ? 'PAID' : installment.status,
            paidAt: fullyPaid ? (dto.paymentDate ? new Date(dto.paymentDate) : new Date()) : null,
          },
        });
        if (fullyPaid) paidCount++;

        remaining = remaining.minus(paid);
      }

      const totalPaid = amount.minus(remaining);
      const payment = await tx.debtPayment.create({
        data: {
          debtId,
          userId,
          amount: roundMoney(totalPaid),
          paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
          note: dto.note,
          installmentId: nextInstallmentId,
        },
      });

      const newBalance = debt.currentBalance.minus(principalPaid);
      const settled = newBalance.lte(0.004);
      const updatedDebt = await tx.debt.update({
        where: { id: debtId },
        data: {
          currentBalance: settled ? money(0) : roundMoney(newBalance),
          paidInstallments: { increment: paidCount },
          status: settled ? 'PAID_OFF' : debt.status,
        },
      });

      return { payment, updatedDebt, principalPaid, interestPaid, penaltyPaid, totalPaid, settled };
    });

    return {
      payment: result.payment,
      debt: this.decorate(result.updatedDebt),
      allocation: {
        principal: roundMoney(result.principalPaid),
        interest: roundMoney(result.interestPaid),
        penalty: roundMoney(result.penaltyPaid),
        unallocated: roundMoney(remaining),
      },
      settled: result.settled,
    };
  }

  // ---------- Juros e multas (job mensal) ----------

  /**
   * Apropriação mensal de juros e multas sobre dívidas ATRASADAS.
   * Idempotente: cria no máximo uma parcela de encargos por mês por dívida.
   */
  async accrueMonthlyCharges() {
    const overdue = await this.prisma.debt.findMany({
      where: { status: 'OVERDUE', currentBalance: { gt: 0 } },
    });

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    for (const debt of overdue) {
      const existing = await this.prisma.debtInstallment.findFirst({
        where: { debtId: debt.id, dueDate: { gte: monthStart } },
      });
      if (existing) continue;

      const balance = money(debt.currentBalance);
      const monthlyRate =
        debt.interestType === 'ANNUAL' ? money(debt.interestRate).div(12) : money(debt.interestRate);
      const interest = balance.times(monthlyRate).div(100);
      const penalty = balance.times(debt.penaltyRate).div(100);
      const total = interest.plus(penalty);

      if (total.lte(0.004)) continue;

      await this.prisma.debtInstallment.create({
        data: {
          debtId: debt.id,
          userId: debt.userId,
          installmentNumber: (debt.totalInstallments ?? 0) + 1,
          dueDate: addMonths(now, 1),
          principalAmount: money(0),
          interestAmount: roundMoney(interest),
          penaltyAmount: roundMoney(penalty),
          totalAmount: roundMoney(total),
          paidAmount: money(0),
          status: 'OVERDUE',
        },
      });
    }

    return { processed: overdue.length };
  }

  // ---------- Helpers ----------

  private decorate(debt: DebtWithRelations) {
    const original = money(debt.originalAmount);
    const balance = money(debt.currentBalance);
    const paid = original.minus(balance).lt(0) ? money(0) : original.minus(balance);
    const progress = original.isZero() ? 0 : Number(paid.div(original).mul(100).toDecimalPlaces(1));

    return {
      ...debt,
      progressPercent: progress,
      paidAmount: roundMoney(paid),
      nextInstallment:
        Array.isArray(debt.installments) && debt.installments.length ? debt.installments[0] : null,
    };
  }
}

type DebtWithRelations = Debt & { installments?: unknown[]; payments?: unknown[] };

type CreateDebtLike = {
  creditor: string;
  type: string;
  originalAmount: number;
  currentBalance?: number;
  interestRate?: number;
  interestType?: string;
  penaltyRate?: number;
  installmentAmount?: number;
  totalInstallments?: number;
  dueDate: string;
  status?: string;
  priority?: string;
  notes?: string;
};