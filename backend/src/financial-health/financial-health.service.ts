import { Injectable } from '@nestjs/common';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { FinancialHealthScoreService, HealthScoreMetrics } from './financial-health-score.service';
import { roundMoney, toNumber } from '../common/utils/money';

@Injectable()
export class FinancialHealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scorer: FinancialHealthScoreService,
  ) {}

  async currentScore(userId: string) {
    const metrics = await this.gatherMetrics(userId);
    const score = this.scorer.compute(metrics);
    const evolution = await this.evolution(userId, 6);
    return { ...score, evolution };
  }

  async evolution(userId: string, months = 6) {
    const now = new Date();
    const points: Array<{ month: string; score: number }> = [];

    for (let i = months - 1; i >= 0; i--) {
      const base = subMonths(startOfMonth(now), i);
      const end = endOfMonth(base);
      const snapshot = await this.gatherMetrics(userId, base, end);
      points.push({
        month: `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, '0')}`,
        score: this.scorer.compute(snapshot).score,
      });
    }
    return points;
  }

  /**
   * Coleta métricas reais do banco para o período informado (ou o mês atual).
   */
  private async gatherMetrics(userId: string, from = startOfMonth(new Date()), to = endOfMonth(new Date())): Promise<HealthScoreMetrics> {
    const [incomeAgg, expenseAgg, debtAgg, overdueDebts, overdueCard, cardUtil, budget, accounts, essentialAgg] =
      await Promise.all([
        this.prisma.transaction.aggregate({
          where: { userId, type: 'INCOME', status: 'CONFIRMED', transactionDate: { gte: from, lte: to } },
          _sum: { amount: true },
        }),
        this.prisma.transaction.aggregate({
          where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: from, lte: to } },
          _sum: { amount: true },
        }),
        this.prisma.debt.aggregate({
          where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } },
          _sum: { currentBalance: true },
        }),
        this.prisma.debt.count({ where: { userId, status: 'OVERDUE' } }),
        this.prisma.creditCardInstallment.count({
          where: { userId, status: 'OVERDUE' },
        }),
        this.prisma.creditCard.findMany({ where: { userId, isActive: true } }),
        this.prisma.budget.findFirst({
          where: { userId, month: to.getMonth() + 1, year: to.getFullYear() },
          include: { categories: true },
        }),
        this.prisma.account.aggregate({ where: { userId, isActive: true }, _sum: { currentBalance: true } }),
        this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'EXPENSE',
            status: 'CONFIRMED',
            transactionDate: { gte: from, lte: to },
            category: { name: { in: ['Moradia', 'Alimentação', 'Transporte', 'Saúde'] } },
          },
          _sum: { amount: true },
        }),
      ]);

    const income = toNumber(incomeAgg._sum.amount ?? 0);
    const expenses = toNumber(expenseAgg._sum.amount ?? 0);
    const totalDebt = toNumber(debtAgg._sum.currentBalance ?? 0);
    const essential = Math.max(toNumber(essentialAgg._sum.amount ?? 0), 1);
    const balance = toNumber(accounts._sum.currentBalance ?? 0);

    // Utilização média de cartões
    const cardInfo = cardUtil.map((card) => {
      const limit = toNumber(card.limit);
      return limit > 0 ? limit : 1;
    });
    const totalLimit = cardInfo.reduce((a, b) => a + b, 0);
    const cardInstallmentsAgg = await this.prisma.creditCardInstallment.aggregate({
      where: { userId, status: { in: ['PENDING', 'OVERDUE'] } },
      _sum: { amount: true },
    });
    const cardUsed = toNumber(cardInstallmentsAgg._sum.amount ?? 0);

    // Mínimos de dívida: soma das parcelas pendentes do mês
    const debtMinimumsAgg = await this.prisma.debtInstallment.aggregate({
      where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: from, lte: to } },
      _sum: { totalAmount: true },
    });
    const debtMinimums = toNumber(debtMinimumsAgg._sum.totalAmount ?? 0);

    const commitmentRatio = income > 0 ? ((essential + debtMinimums) / income) * 100 : 100;

    return {
      commitmentRatio,
      income,
      totalDebt,
      overdueDebtCount: overdueDebts,
      overdueCardInstallmentCount: overdueCard,
      cardUtilization: totalLimit > 0 ? (cardUsed / totalLimit) * 100 : 0,
      savingsRate: income > 0 ? Math.max(0, (income - expenses) / income) : 0,
      budgetCategoriesOver: budget?.categories.filter((c) => toNumber(c.spent) > toNumber(c.limit)).length ?? 0,
      budgetCategoriesTotal: budget?.categories.length ?? 0,
      reserveMonths: balance / essential,
    };
  }
}