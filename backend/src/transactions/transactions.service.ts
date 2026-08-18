import { Injectable } from '@nestjs/common';
import { Prisma, TransactionStatus, TransactionType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';
import { AppException } from '../common/exceptions/app.exception';
import { money, roundMoney } from '../common/utils/money';

export interface CreateTransactionInput {
  userId: string;
  accountId: string;
  transferAccountId?: string;
  categoryId?: string;
  type: TransactionType;
  amount: number;
  description: string;
  transactionDate?: Date;
  recurring?: boolean;
  recurrenceRule?: string;
  idempotencyKey?: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accounts: AccountsService,
  ) {}

  /**
   * Cria uma movimentação com atualização atômica de saldos.
   * Idempotência: se a chave já foi usada, retorna a movimentação existente.
   */
  async create(input: CreateTransactionInput) {
    const { userId, idempotencyKey } = input;

    if (idempotencyKey) {
      const existing = await this.prisma.transaction.findUnique({
        where: { idempotencyKey },
      });
      if (existing && existing.userId === userId) {
        return { transaction: existing, duplicated: true };
      }
      if (existing) {
        throw new AppException('DUPLICATE_IDEMPOTENCY_KEY', 'Chave de idempotência já utilizada por outro usuário.');
      }
    }

    const account = await this.accounts.getOwned(userId, input.accountId);

    if (input.type === 'TRANSFER') {
      if (!input.transferAccountId) {
        throw new AppException('UNPROCESSABLE', 'Transferência requer conta de destino.');
      }
      if (input.transferAccountId === account.id) {
        throw new AppException('UNPROCESSABLE', 'A conta de destino deve ser diferente da origem.');
      }
      await this.accounts.getOwned(userId, input.transferAccountId);
    }

    const amount = money(input.amount).abs();
    if (amount.isZero()) {
      throw new AppException('INVALID_AMOUNT', 'O valor da movimentação deve ser maior que zero.');
    }

    const isAdjustment = input.type === 'ADJUSTMENT';
    // ADJUSTMENT aceita sinal; demais tipos sempre positivos.
    const signedAmount = isAdjustment ? money(input.amount) : amount;

    try {
      const transaction = await this.prisma.$transaction(async (tx) => {
        const created = await tx.transaction.create({
          data: {
            userId,
            accountId: account.id,
            transferAccountId: input.type === 'TRANSFER' ? input.transferAccountId : null,
            categoryId: input.categoryId,
            type: input.type,
            amount: signedAmount,
            description: input.description,
            transactionDate: input.transactionDate ?? new Date(),
            recurring: input.recurring ?? false,
            recurrenceRule: input.recurrenceRule,
            idempotencyKey: idempotencyKey ?? null,
          },
        });

        await this.applyBalanceEffect(tx, account.id, input.type, signedAmount, input.transferAccountId);
        return created;
      });

      return { transaction, duplicated: false };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        idempotencyKey
      ) {
        const existing = await this.prisma.transaction.findUnique({ where: { idempotencyKey } });
        if (existing) return { transaction: existing, duplicated: true };
      }
      throw error;
    }
  }

  private async applyBalanceEffect(
    tx: Prisma.TransactionClient,
    accountId: string,
    type: TransactionType,
    amount: Prisma.Decimal,
    transferAccountId?: string,
  ) {
    switch (type) {
      case 'INCOME':
        await this.accounts.applyBalanceDelta(tx, accountId, amount);
        break;
      case 'EXPENSE':
        await this.accounts.applyBalanceDelta(tx, accountId, amount.neg());
        break;
      case 'TRANSFER':
        await this.accounts.applyBalanceDelta(tx, accountId, amount.neg());
        if (transferAccountId) {
          await this.accounts.applyBalanceDelta(tx, transferAccountId, amount);
        }
        break;
      case 'ADJUSTMENT':
        await this.accounts.applyBalanceDelta(tx, accountId, amount);
        break;
    }
  }

  async list(
    userId: string,
    filters: {
      type?: string;
      accountId?: string;
      categoryId?: string;
      from?: string;
      to?: string;
      search?: string;
      page?: number;
      perPage?: number;
    },
  ) {
    const page = filters.page ?? 1;
    const perPage = Math.min(filters.perPage ?? 20, 100);

    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(filters.type ? { type: filters.type as TransactionType } : {}),
      ...(filters.accountId ? { accountId: filters.accountId } : {}),
      ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
      ...(filters.from || filters.to
        ? {
            transactionDate: {
              ...(filters.from ? { gte: new Date(filters.from) } : {}),
              ...(filters.to ? { lte: new Date(filters.to) } : {}),
            },
          }
        : {}),
      ...(filters.search
        ? { description: { contains: filters.search, mode: 'insensitive' } }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        include: { account: true, category: true },
        orderBy: { transactionDate: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    return {
      items,
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    };
  }

  async getOwned(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
      include: { account: true, category: true },
    });
    if (!transaction) throw new AppException('TRANSACTION_NOT_FOUND', 'Movimentação não encontrada.', 404);
    return transaction;
  }

  async update(userId: string, id: string, dto: { description?: string; categoryId?: string; transactionDate?: string; status?: string }) {
    const existing = await this.getOwned(userId, id);
    return this.prisma.transaction.update({
      where: { id },
      data: {
        description: dto.description,
        categoryId: dto.categoryId,
        transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : undefined,
        status: dto.status as TransactionStatus,
      },
    });
  }

  /**
   * Cancelamento reverte o efeito no saldo de forma atômica (soft delete financeiro).
   */
  async cancel(userId: string, id: string) {
    const existing = await this.getOwned(userId, id);
    if (existing.status === 'CANCELED') return existing;
    if (existing.type === 'TRANSFER' && !existing.transferAccountId) {
      throw new AppException('UNPROCESSABLE', 'Transferência sem conta de destino não pode ser cancelada.');
    }

    const signedAmount = money(existing.amount);
    const reversal = signedAmount.neg();

    await this.prisma.$transaction(async (tx) => {
      await tx.transaction.update({ where: { id }, data: { status: 'CANCELED' } });
      switch (existing.type) {
        case 'INCOME':
          await this.accounts.applyBalanceDelta(tx, existing.accountId, reversal);
          break;
        case 'EXPENSE':
          await this.accounts.applyBalanceDelta(tx, existing.accountId, signedAmount);
          break;
        case 'TRANSFER':
          await this.accounts.applyBalanceDelta(tx, existing.accountId, signedAmount);
          if (existing.transferAccountId) {
            await this.accounts.applyBalanceDelta(tx, existing.transferAccountId, reversal);
          }
          break;
        case 'ADJUSTMENT':
          await this.accounts.applyBalanceDelta(tx, existing.accountId, reversal);
          break;
      }
    });

    return this.getOwned(userId, id);
  }

  /** Totais de receitas/despesas no período (usado por dashboard e relatórios). */
  async totalsInRange(userId: string, from: Date, to: Date) {
    const rows = await this.prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId,
        status: 'CONFIRMED',
        transactionDate: { gte: from, lte: to },
      },
      _sum: { amount: true },
    });

    const income = rows.find((r) => r.type === 'INCOME')?._sum.amount ?? money(0);
    const expense = rows
      .filter((r) => r.type === 'EXPENSE')
      .reduce((acc, r) => acc.plus(r._sum.amount ?? 0), money(0));

    return {
      income: roundMoney(income),
      expense: roundMoney(expense),
      net: roundMoney(income.minus(expense)),
    };
  }
}