import { Injectable } from '@nestjs/common';
import { addDays, startOfDay } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { FinancialCapacityService } from './financial-capacity.service';
import { AppException } from '../common/exceptions/app.exception';
import { money, roundMoney, toNumber } from '../common/utils/money';

export type CanISpendStatus = 'SAFE' | 'CAUTION' | 'NOT_RECOMMENDED';

export interface CanISpendResult {
  status: CanISpendStatus;
  amount: number;
  reason: string;
  projectedBalance: number;
  futureCommitmentPercent: number;
  impact: {
    balanceAfter: number;
    balanceAfterPercent: number;
    vsSafetyFloor: number;
  };
}

/**
 * "Posso gastar?" — analisa saldo, receitas previstas, despesas futuras,
 * dívidas, faturas, orçamento, metas e compromissos próximos (30 dias)
 * para classificar a compra em SAFE | CAUTION | NOT_RECOMMENDED.
 */
@Injectable()
export class CanISpendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly capacity: FinancialCapacityService,
  ) {}

  async analyze(userId: string, amount: number): Promise<CanISpendResult> {
    if (!(amount > 0)) throw new AppException('INVALID_AMOUNT', 'Informe um valor maior que zero.');

    const now = startOfDay(new Date());
    const horizon = addDays(now, 30);

    const [accounts, income, expense, debtCommitments, cardCommitments, budget, essentials] =
      await Promise.all([
        this.prisma.account.aggregate({
          where: { userId, isActive: true },
          _sum: { currentBalance: true },
        }),
        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'INCOME',
            status: 'CONFIRMED',
            transactionDate: { gte: now, lte: horizon },
          },
          _sum: { amount: true },
        }),
        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'EXPENSE',
            status: 'CONFIRMED',
            transactionDate: { gte: now, lte: horizon },
          },
          _sum: { amount: true },
        }),
        this.prisma.debtInstallment.aggregate({
          where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: now, lte: horizon } },
          _sum: { totalAmount: true },
        }),
        this.prisma.creditCardInstallment.aggregate({
          where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: now, lte: horizon } },
          _sum: { amount: true },
        }),
        this.prisma.budget.findFirst({
          where: { userId, month: now.getMonth() + 1, year: now.getFullYear() },
          include: { categories: true },
        }),
        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'EXPENSE',
            status: 'CONFIRMED',
            category: { name: { in: ['Moradia', 'Alimentação', 'Transporte', 'Saúde'] } },
          },
          _sum: { amount: true },
        }),
      ]);

    const currentBalance = toNumber(accounts._sum.currentBalance ?? 0);
    const projectedIncome = toNumber(income._sum.amount ?? 0);
    const projectedExpenses = toNumber(expense._sum.amount ?? 0);
    const debtDue = toNumber(debtCommitments._sum.totalAmount ?? 0);
    const cardDue = toNumber(cardCommitments._sum.amount ?? 0);

    // Piso de segurança: 20% das despesas essenciais mensais estimadas.
    const essentialMonthly = Math.max(toNumber(essentials._sum.amount ?? 0) / 3, 0);
    const safetyFloor = essentialMonthly * 0.2;

    const projectedBalance = currentBalance + projectedIncome - projectedExpenses - debtDue - cardDue;
    const balanceAfter = projectedBalance - amount;

    const futureCommitment = projectedBalance > 0 ? ((debtDue + cardDue + amount) / (projectedBalance + amount)) * 100 : 100;

    let status: CanISpendStatus;
    let reason: string;

    if (balanceAfter < safetyFloor) {
      status = 'NOT_RECOMMENDED';
      reason =
        'A compra reduziria sua margem financeira abaixo do nível de segurança, considerando seus compromissos dos próximos 30 dias.';
    } else if (futureCommitment > 80) {
      status = 'NOT_RECOMMENDED';
      reason = 'A compra elevaria seu comprometimento futuro acima de 80% da sua disponibilidade projetada.';
    } else if (balanceAfter < safetyFloor * 2) {
      status = 'CAUTION';
      reason = 'Você conseguiria pagar, mas ficaria com margem apertada após os compromissos dos próximos 30 dias.';
    } else {
      status = 'SAFE';
      reason = 'Seus saldo e compromissos projetados dos próximos 30 dias suportam a compra com folga.';
    }

    return {
      status,
      amount,
      reason,
      projectedBalance: toNumber(roundMoney(projectedBalance)),
      futureCommitmentPercent: Math.round(futureCommitment * 10) / 10,
      impact: {
        balanceAfter: toNumber(roundMoney(balanceAfter)),
        balanceAfterPercent:
          balanceAfter >= 0 ? Math.min(100, (amount / Math.max(1, balanceAfter + amount)) * 100) : 100,
        vsSafetyFloor: toNumber(roundMoney(balanceAfter - safetyFloor)),
      },
    };
  }
}