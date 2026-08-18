import { Injectable } from '@nestjs/common';
import { addDays, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { FinancialHealthService } from '../financial-health/financial-health.service';
import { roundMoney, toNumber } from '../common/utils/money';

const ESSENTIAL_CATEGORIES = ['Moradia', 'Alimentação', 'Transporte', 'Saúde'];

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly health: FinancialHealthService,
  ) {}

  /**
   * Resposta agregada para a home — evita dezenas de requisições no app.
   */
  async getDashboard(userId: string) {
    const now = startOfDay(new Date());
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const horizon = addDays(now, 15);

    const [accounts, income, expense, debtAgg, debtPayments, debtInstallments15d, cardInstallments15d, score, insights, budget] =
      await Promise.all([
        this.prisma.account.aggregate({ where: { userId, isActive: true }, _sum: { currentBalance: true } }),
        this.prisma.transaction.aggregate({
          where: { userId, type: 'INCOME', status: 'CONFIRMED', transactionDate: { gte: monthStart, lte: monthEnd } },
          _sum: { amount: true },
        }),
        this.prisma.transaction.aggregate({
          where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: monthStart, lte: monthEnd } },
          _sum: { amount: true },
        }),
        this.prisma.debt.aggregate({
          where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } },
          _sum: { currentBalance: true },
        }),
        this.prisma.debtPayment.aggregate({
          where: { userId, paymentDate: { gte: monthStart, lte: monthEnd } },
          _sum: { amount: true },
        }),
        this.prisma.debtInstallment.findMany({
          where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: now, lte: horizon } },
          include: { debt: { select: { creditor: true } } },
          orderBy: { dueDate: 'asc' },
        }),
        this.prisma.creditCardInstallment.findMany({
          where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: now, lte: horizon } },
          include: { card: { select: { name: true } } },
          orderBy: { dueDate: 'asc' },
        }),
        this.health.currentScore(userId),
        this.prisma.financialInsight.findMany({
          where: { userId, isRead: false },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
        this.prisma.budget.findFirst({
          where: { userId, month: now.getMonth() + 1, year: now.getFullYear() },
          include: { categories: true },
        }),
      ]);

    const balance = roundMoney(accounts._sum.currentBalance ?? 0);
    const monthIncome = roundMoney(income._sum.amount ?? 0);
    const monthExpense = roundMoney(expense._sum.amount ?? 0);
    const totalDebt = roundMoney(debtAgg._sum.currentBalance ?? 0);
    const monthDebtPaid = roundMoney(debtPayments._sum.amount ?? 0);

    const upcoming = [
      ...debtInstallments15d.map((i) => ({
        type: 'DEBT_INSTALLMENT',
        label: i.debt.creditor,
        amount: roundMoney(i.totalAmount),
        dueDate: i.dueDate,
        overdue: i.status === 'OVERDUE',
      })),
      ...cardInstallments15d.map((i) => ({
        type: 'CARD_INSTALLMENT',
        label: i.card.name,
        amount: roundMoney(i.amount),
        dueDate: i.dueDate,
        overdue: i.status === 'OVERDUE',
      })),
    ].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    const upcomingTotal = roundMoney(
      upcoming.reduce((acc, c) => acc.plus(c.amount), roundMoney(0)),
    );

    // Alerta inteligente: despesas previstas próximas vs capacidade recomendada.
    const essentialMonthly = toNumber(
      (
        await this.prisma.transaction.aggregate({
          where: {
            userId,
            type: 'EXPENSE',
            status: 'CONFIRMED',
            transactionDate: { gte: monthStart, lte: monthEnd },
            category: { name: { in: ESSENTIAL_CATEGORIES } },
          },
          _sum: { amount: true },
        })
      )._sum.amount ?? 0,
    );
    const recommendedLimit = Math.max(essentialMonthly * 1.2, toNumber(monthIncome) * 0.5);

    const alerts: Array<{ severity: 'WARNING' | 'DANGER' | 'INFO'; title: string; message: string }> = [];
    if (toNumber(upcomingTotal) > recommendedLimit) {
      alerts.push({
        severity: 'WARNING',
        title: 'Atenção',
        message: 'Suas despesas previstas para os próximos 15 dias estão acima do seu limite recomendado.',
      });
    }
    if (budget && toNumber(monthExpense) > toNumber(budget.totalLimit)) {
      alerts.push({
        severity: 'DANGER',
        title: 'Orçamento estourado',
        message: 'Suas despesas do mês ultrapassaram o orçamento definido.',
      });
    }
    const overdueCount =
      debtInstallments15d.filter((i) => i.status === 'OVERDUE').length +
      cardInstallments15d.filter((i) => i.status === 'OVERDUE').length;
    if (overdueCount > 0) {
      alerts.push({
        severity: 'DANGER',
        title: 'Contas atrasadas',
        message: `Você tem ${overdueCount} ${overdueCount === 1 ? 'compromisso atrasado' : 'compromissos atrasados'}.`,
      });
    }

    return {
      balance,
      month: {
        income: monthIncome,
        expense: monthExpense,
        net: roundMoney(toNumber(monthIncome) - toNumber(monthExpense)),
      },
      debts: {
        total: totalDebt,
        paidThisMonth: monthDebtPaid,
      },
      upcoming,
      upcomingTotal,
      alerts,
      score,
      insights,
    };
  }
}