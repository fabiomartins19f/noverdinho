import { Injectable } from '@nestjs/common';
import { AccountType, Prisma, TransactionType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { money } from '../common/utils/money';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: [{ isActive: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async getOwned(userId: string, id: string) {
    const account = await this.prisma.account.findFirst({ where: { id, userId } });
    if (!account) throw new AppException('ACCOUNT_NOT_FOUND', 'Conta não encontrada.', 404);
    return account;
  }

  async create(userId: string, dto: { name: string; type?: string; initialBalance?: number; institution?: string }) {
    const initial = money(dto.initialBalance ?? 0);
    return this.prisma.account.create({
      data: {
        userId,
        name: dto.name,
        type: (dto.type as AccountType) ?? 'CHECKING',
        initialBalance: initial,
        currentBalance: initial,
        institution: dto.institution,
      },
    });
  }

  async update(userId: string, id: string, dto: Prisma.AccountUpdateInput) {
    await this.getOwned(userId, id);
    return this.prisma.account.update({ where: { id }, data: dto });
  }

  async delete(userId: string, id: string) {
    await this.getOwned(userId, id);
    const txCount = await this.prisma.transaction.count({ where: { accountId: id } });
    if (txCount > 0) {
      // Soft delete: não apagar contas com histórico financeiro.
      return this.prisma.account.update({ where: { id }, data: { isActive: false } });
    }
    await this.prisma.account.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Aplica delta no saldo de uma conta dentro de uma transação Prisma.
   * Sempre chamado a partir de operações transacionais (TransactionsService).
   */
  applyBalanceDelta(tx: Prisma.TransactionClient, accountId: string, delta: Prisma.Decimal) {
    return tx.account.update({
      where: { id: accountId },
      data: { currentBalance: { increment: delta } },
    });
  }
}