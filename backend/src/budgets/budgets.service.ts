import { Injectable } from '@nestjs/common';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Prisma, TransactionType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { money, roundMoney } from '../common/utils/money';

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Upsert do orçamento do mês: total + limites por categoria.
   * O consumo (spent) é RECALCULADO do servidor a partir das transações reais.
   */
  async upsert(userId: string, dto: { month: number; year: number; totalLimit: number; categories: { categoryId?: string; name: string; limit: number }[] }) {
    const existing = await this.prisma.budget.findUnique({
      where: { userId_month_year: { userId, month: dto.month, year: dto.year } },
      include: { categories: true },
    });

    const result = await this.prisma.$transaction(async (tx) => {
      const budget = existing
        ? await tx.budget.update({
            where: { id: existing.id },
            data: { totalLimit: money(dto.totalLimit) },
          })
        : await tx.budget.create({
            data: {
              userId,
              month: dto.month,
              year: dto.year,
              totalLimit: money(dto.totalLimit),
            },
          });

      await tx.budgetCategory.deleteMany({ where: { budgetId: budget.id } });
      for (const cat of dto.categories) {
        await tx.budgetCategory.create({
          data: { budgetId: budget.id, categoryId: cat.categoryId ?? null, name: cat.name, limit: money(cat.limit) },
        });
      }
      return budget;
    });

    return this.get(userId, dto.month, dto.year);
  }

  async get(userId: string, month: number, year: number) {
    const budget = await this.prisma.budget.findUnique({
      where: { userId_month_year: { userId, month, year } },
      include: { categories: true },
    });
    if (!budget) throw new AppException('BUDGET_NOT_FOUND', 'Orçamento do mês não encontrado.', 404);

    const range = { start: startOfMonth(new Date(year, month - 1, 1)), end: endOfMonth(new Date(year, month - 1, 1)) };

    // Consumo real por categoria de despesa.
    const spendByCategory = await this.prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        type: TransactionType.EXPENSE,
        status: 'CONFIRMED',
        transactionDate: { gte: range.start, lte: range.end },
        categoryId: { not: null },
      },
      _sum: { amount: true },
    });
    const spendMap = new Map(spendByCategory.map((r) => [r.categoryId, r._sum.amount ?? money(0)]));

    const categories = budget.categories.map((cat) => {
      const spent = spendMap.get(cat.categoryId ?? '') ?? money(0);
      return {
        ...cat,
        spent: roundMoney(spent),
        usedPercent: cat.limit.isZero() ? 0 : Number(spent.div(cat.limit).mul(100).toDecimalPlaces(1)),
      };
    });

    const totalSpent = categories.reduce((acc, c) => acc.plus(c.spent), money(0));

    return {
      ...budget,
      totalSpent: roundMoney(totalSpent),
      usedPercent: budget.totalLimit.isZero() ? 0 : Number(totalSpent.div(budget.totalLimit).mul(100).toDecimalPlaces(1)),
      categories,
      alerts: this.buildAlerts(categories),
    };
  }

  private buildAlerts(categories: { name: string; usedPercent: number }[]) {
    return categories
      .filter((c) => c.usedPercent >= 80)
      .map((c) => ({
        category: c.name,
        severity: c.usedPercent >= 100 ? 'OVER' : 'NEAR',
        message:
          c.usedPercent >= 100
            ? `Limite de ${c.name} ultrapassado.`
            : `Você já usou ${c.usedPercent}% do limite de ${c.name}.`,
      }));
  }

  async list(userId: string, year?: number) {
    return this.prisma.budget.findMany({
      where: { userId, ...(year ? { year } : {}) },
      include: { categories: true },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
      take: 24,
    });
  }

  async delete(userId: string, month: number, year: number) {
    const budget = await this.prisma.budget.findUnique({
      where: { userId_month_year: { userId, month, year } },
    });
    if (!budget) throw new AppException('BUDGET_NOT_FOUND', 'Orçamento do mês não encontrado.', 404);
    await this.prisma.budgetCategory.deleteMany({ where: { budgetId: budget.id } });
    await this.prisma.budget.delete({ where: { id: budget.id } });
    return { deleted: true };
  }
}