import { Injectable } from '@nestjs/common';
import { addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { DebtPriority, InsightType, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { toNumber } from '../common/utils/money';

export interface InsightDraft {
  type: InsightType;
  title: string;
  description: string;
  action?: string;
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
}

/**
 * Inteligência financeira — v1 determinística (regras de negócio).
 * IA pode ser integrada posteriormente sem alterar este contrato.
 */
@Injectable()
export class InsightsService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(userId: string): Promise<InsightDraft[]> {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(addMonths(now, -1));
    const lastMonthEnd = endOfMonth(addMonths(now, -1));

    const [thisExpense, lastExpense, thisIncome, debts, cards, budget, score, lastScore] =
      await Promise.all([
        this.prisma.transaction.groupBy({
          by: ['categoryId'],
          where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: thisMonthStart, lte: thisMonthEnd }, categoryId: { not: null } },
          _sum: { amount: true },
        }),
        this.prisma.transaction.groupBy({
          by: ['categoryId'],
          where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: lastMonthStart, lte: lastMonthEnd }, categoryId: { not: null } },
          _sum: { amount: true },
        }),
        this.prisma.transaction.aggregate({
          where: { userId, type: 'INCOME', status: 'CONFIRMED', transactionDate: { gte: thisMonthStart, lte: thisMonthEnd } },
          _sum: { amount: true },
        }),
        this.prisma.debt.findMany({
          where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } },
        }),
        this.prisma.creditCard.findMany({ where: { userId, isActive: true } }),
        this.prisma.budget.findFirst({
          where: { userId, month: now.getMonth() + 1, year: now.getFullYear() },
          include: { categories: true },
        }),
        this.currentScoreSnapshot(userId),
        this.scoreSnapshotFor(userId, addMonths(now, -1)),
      ]);

    const insights: InsightDraft[] = [];
    const categoryName = await this.categoryNames();

    // 1. Redução de gastos (>= 15%)
    const thisMap = new Map(thisExpense.map((r) => [r.categoryId, toNumber(r._sum.amount ?? 0)]));
    for (const row of lastExpense) {
      const catId = row.categoryId ?? '';
      const last = toNumber(row._sum.amount ?? 0);
      const current = thisMap.get(catId) ?? 0;
      if (last > 0 && current <= last * 0.85) {
        insights.push({
          type: 'SPENDING_DECREASE',
          title: 'Boa redução de gastos',
          description: `Você gastou ${Math.round(((last - current) / last) * 100)}% menos com ${categoryName.get(catId)} neste mês.`,
          action: 'Manter o ritmo',
          importance: 'MEDIUM',
        });
      }
    }

    // 2. Aumento de gastos (>= 30%)
    for (const [catIdRaw, current] of thisMap) {
      const catId = catIdRaw ?? '';
      const last = toNumber(lastExpense.find((r) => r.categoryId === catId)?._sum.amount ?? 0);
      if (last > 0 && current > last * 1.3) {
        insights.push({
          type: 'SPENDING_INCREASE',
          title: 'Aumento significativo',
          description: `Seus gastos com ${categoryName.get(catId)} subiram ${Math.round(((current - last) / last) * 100)}% em relação ao mês anterior.`,
          action: 'Revisar orçamento',
          importance: 'HIGH',
        });
      }
    }

    // 3. Comprometimento elevado da renda
    const income = toNumber(thisIncome._sum.amount ?? 0);
    const debtMinimums = debts.reduce((acc, d) => acc + toNumber(d.installmentAmount ?? 0), 0);
    if (income > 0 && debtMinimums / income > 0.4) {
      insights.push({
        type: 'INCOME_COMMITMENT',
        title: 'Renda muito comprometida',
        description: 'Seus pagamentos de dívidas representam uma parcela elevada da sua renda.',
        action: 'Ver plano de quitação',
        importance: 'HIGH',
      });
    }

    // 4. Cartão próximo do limite
    for (const card of cards) {
      const limit = toNumber(card.limit);
      const used = toNumber(
        (
          await this.prisma.creditCardInstallment.aggregate({
            where: { cardId: card.id, status: { in: ['PENDING', 'OVERDUE'] } },
            _sum: { amount: true },
          })
        )._sum.amount ?? 0,
      );
      if (limit > 0 && used / limit > 0.8) {
        insights.push({
          type: 'CARD_LIMIT',
          title: `${card.name} próximo do limite`,
          description: `Você utilizou ${Math.round((used / limit) * 100)}% do limite do cartão.`,
          action: 'Revisar parcelas',
          importance: 'HIGH',
        });
      }
    }

    // 5. Dívida com juros elevados
    const highRateDebt = debts.find((d) => toNumber(d.interestRate) > 80);
    if (highRateDebt) {
      insights.push({
        type: 'HIGH_INTEREST_DEBT',
        title: 'Juros elevados detectados',
        description: `A dívida com ${highRateDebt.creditor} tem taxa de ${highRateDebt.interestRate}%${
          highRateDebt.interestType === 'ANNUAL' ? ' ao ano' : ''
        }. Priorize quitá-la (estratégia avalanche).`,
        action: 'Criar plano de quitação',
        importance: 'HIGH',
      });
    }

    // 6. Orçamento
    if (budget) {
      const over = budget.categories.filter((c) => toNumber(c.spent) > toNumber(c.limit));
      if (over.length > 0) {
        insights.push({
          type: 'BUDGET_OVERRUN',
          title: 'Orçamento estourado',
          description: `${over.map((c) => c.name).join(', ')} ${over.length === 1 ? 'ultrapassou' : 'ultrapassaram'} o limite do mês.`,
          action: 'Ajustar orçamento',
          importance: 'HIGH',
        });
      } else {
        insights.push({
          type: 'BUDGET_GOOD',
          title: 'Dentro do orçamento',
          description: 'Todas as categorias estão dentro do limite neste mês. Continue assim.',
          importance: 'LOW',
        });
      }
    }

    // 7. Evolução positiva
    if (score && lastScore && score - lastScore >= 5) {
      insights.push({
        type: 'POSITIVE_EVOLUTION',
        title: 'Você avançou no verdinho',
        description: `Seu nível subiu ${score - lastScore} pontos no último mês.`,
        importance: 'MEDIUM',
      });
    }

    // 8. Oportunidade de antecipação
    const mainDebt = [...debts].sort((a, b) => toNumber(b.interestRate) - toNumber(a.interestRate))[0];
    if (mainDebt && toNumber(mainDebt.currentBalance) > 0 && income > 0) {
      insights.push({
        type: 'PAYOFF_OPPORTUNITY',
        title: 'Antecipe sua quitação',
        description: `Adicionar R$ 200 ao pagamento mensal da dívida com ${mainDebt.creditor} pode antecipar a quitação e reduzir juros.`,
        action: 'Simular no plano',
        importance: 'MEDIUM',
      });
    }

    await this.persist(userId, insights);
    return insights;
  }

  private async persist(userId: string, insights: InsightDraft[]) {
    await this.prisma.$transaction([
      this.prisma.financialInsight.deleteMany({
        where: { userId, isRead: false, type: { in: insights.map((i) => i.type) } },
      }),
      ...insights.map((i) =>
        this.prisma.financialInsight.create({
          data: {
            userId,
            type: i.type,
            title: i.title,
            description: i.description,
            action: i.action,
            importance: i.importance as DebtPriority,
          },
        }),
      ),
    ]);
  }

  async list(userId: string, unreadOnly = false) {
    return this.prisma.financialInsight.findMany({
      where: { userId, ...(unreadOnly ? { isRead: false } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markRead(userId: string, id: string) {
    return this.prisma.financialInsight.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });
  }

  private async categoryNames() {
    const categories = await this.prisma.category.findMany();
    return new Map(categories.map((c) => [c.id, c.name]));
  }

  private async currentScoreSnapshot(userId: string) {
    return this.scoreSnapshotFor(userId, new Date());
  }

  private async scoreSnapshotFor(userId: string, month: Date) {
    // Snapshot simples: usa a mesma métrica aproximada do score atual.
    const from = startOfMonth(month);
    const to = endOfMonth(month);
    const [income, expense, debts] = await Promise.all([
      this.prisma.transaction.aggregate({
        where: { userId, type: 'INCOME', status: 'CONFIRMED', transactionDate: { gte: from, lte: to } },
        _sum: { amount: true },
      }),
      this.prisma.transaction.aggregate({
        where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: from, lte: to } },
        _sum: { amount: true },
      }),
      this.prisma.debt.aggregate({ where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } }, _sum: { currentBalance: true } }),
    ]);
    const inc = toNumber(income._sum.amount ?? 0);
    const exp = toNumber(expense._sum.amount ?? 0);
    const debtLoad = inc > 0 ? (toNumber(debts._sum.currentBalance ?? 0) / (inc * 12)) * 100 : 100;
    return Math.round(
      Math.min(100, Math.max(0, 100 - (inc > 0 ? ((exp / inc) * 100) : 100) * 0.5 - debtLoad * 0.25)),
    );
  }
}