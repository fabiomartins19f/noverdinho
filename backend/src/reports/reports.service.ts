import { Injectable } from '@nestjs/common';
import { addMonths, differenceInCalendarMonths, endOfMonth, startOfMonth } from 'date-fns';
import { TransactionType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { roundMoney, toNumber } from '../common/utils/money';

const MAX_RANGE_MONTHS = 36;

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private resolveRange(from?: string, to?: string) {
    const toDate = to ? new Date(to) : new Date();
    const fromDate = from ? new Date(from) : startOfMonth(addMonths(toDate, -5));

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new AppException('INVALID_PERIOD', 'Período inválido.');
    }
    if (fromDate > toDate) {
      throw new AppException('INVALID_PERIOD', 'A data inicial não pode ser posterior à final.');
    }
    if (differenceInCalendarMonths(fromDate, toDate) > MAX_RANGE_MONTHS) {
      throw new AppException('INVALID_PERIOD', 'O período máximo é de 36 meses.');
    }
    return { from: startOfMonth(fromDate), to: endOfMonth(toDate) };
  }

  async summary(userId: string, from?: string, to?: string) {
    const { from: f, to: t } = this.resolveRange(from, to);
    const [income, expense, debtPayments, cardUsed, scoreEvolution] = await Promise.all([
      this.prisma.transaction.aggregate({
        where: { userId, type: 'INCOME', status: 'CONFIRMED', transactionDate: { gte: f, lte: t } },
        _sum: { amount: true },
      }),
      this.prisma.transaction.aggregate({
        where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: f, lte: t } },
        _sum: { amount: true },
      }),
      this.prisma.debtPayment.aggregate({
        where: { userId, paymentDate: { gte: f, lte: t } },
        _sum: { amount: true },
      }),
      this.prisma.creditCardInstallment.aggregate({
        where: { userId, status: 'PAID', paidAt: { gte: f, lte: t } },
        _sum: { amount: true },
      }),
      this.debtBalanceEvolution(userId, f, t),
    ]);

    const incomeN = toNumber(income._sum.amount ?? 0);
    const expenseN = toNumber(expense._sum.amount ?? 0);

    return {
      period: { from: f, to: t },
      income: roundMoney(incomeN),
      expense: roundMoney(expenseN),
      net: roundMoney(incomeN - expenseN),
      savingsRate: incomeN > 0 ? Math.round(((incomeN - expenseN) / incomeN) * 1000) / 10 : 0,
      debtPaid: roundMoney(debtPayments._sum.amount ?? 0),
      cardPaid: roundMoney(cardUsed._sum.amount ?? 0),
      debtEvolution: scoreEvolution,
    };
  }

  async incomeExpenseSeries(userId: string, from?: string, to?: string) {
    const { from: f, to: t } = this.resolveRange(from, to);
    const months = differenceInCalendarMonths(f, t) + 1;
    const rows = await this.prisma.transaction.groupBy({
      by: ['type', 'transactionDate'],
      where: { userId, status: 'CONFIRMED', transactionDate: { gte: f, lte: t } },
      _sum: { amount: true },
    });

    const byMonth = new Map<string, { income: number; expense: number }>();
    for (let i = 0; i < months; i++) {
      const m = addMonths(f, i);
      byMonth.set(`${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`, { income: 0, expense: 0 });
    }
    for (const row of rows) {
      const key = `${row.transactionDate.getFullYear()}-${String(row.transactionDate.getMonth() + 1).padStart(2, '0')}`;
      const bucket = byMonth.get(key);
      if (!bucket) continue;
      if (row.type === 'INCOME') bucket.income += toNumber(row._sum.amount ?? 0);
      if (row.type === 'EXPENSE') bucket.expense += toNumber(row._sum.amount ?? 0);
    }

    return Array.from(byMonth.entries()).map(([month, v]) => ({
      month,
      income: roundMoney(v.income),
      expense: roundMoney(v.expense),
      net: roundMoney(v.income - v.expense),
    }));
  }

  async expensesByCategory(userId: string, from?: string, to?: string) {
    const { from: f, to: t } = this.resolveRange(from, to);
    const rows = await this.prisma.transaction.groupBy({
      by: ['categoryId'],
      where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: f, lte: t }, categoryId: { not: null } },
      _sum: { amount: true },
    });
    const categories = await this.prisma.category.findMany({
      where: { id: { in: rows.map((r) => r.categoryId!).filter(Boolean) } },
    });
    const nameById = new Map(categories.map((c) => [c.id, c.name]));
    const total = rows.reduce((acc, r) => acc.plus(r._sum.amount ?? 0), roundMoney(0));

    return rows
      .map((r) => ({
        categoryId: r.categoryId,
        name: nameById.get(r.categoryId!) ?? 'Outros',
        amount: roundMoney(r._sum.amount ?? 0),
        percent: total.isZero() ? 0 : Number(r._sum.amount!.div(total).mul(100).toDecimalPlaces(1)),
      }))
      .sort((a, b) => toNumber(b.amount) - toNumber(a.amount));
  }

  private async debtBalanceEvolution(userId: string, from: Date, to: Date) {
    const startBalance = await this.prisma.debt.aggregate({
      where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] }, createdAt: { lt: from } },
      _sum: { currentBalance: true },
    });
    const current = await this.prisma.debt.aggregate({
      where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } },
      _sum: { currentBalance: true },
    });
    const paid = await this.prisma.debtPayment.aggregate({
      where: { userId, paymentDate: { gte: from, lte: to } },
      _sum: { amount: true },
    });

    return {
      startBalance: roundMoney(startBalance._sum.currentBalance ?? 0),
      currentBalance: roundMoney(current._sum.currentBalance ?? 0),
      paidInPeriod: roundMoney(paid._sum.amount ?? 0),
      reduction: roundMoney(
        toNumber(startBalance._sum.currentBalance ?? 0) - toNumber(current._sum.currentBalance ?? 0),
      ),
    };
  }
}