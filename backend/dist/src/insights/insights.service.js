"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const money_1 = require("../common/utils/money");
let InsightsService = class InsightsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(userId) {
        const now = new Date();
        const thisMonthStart = (0, date_fns_1.startOfMonth)(now);
        const thisMonthEnd = (0, date_fns_1.endOfMonth)(now);
        const lastMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.addMonths)(now, -1));
        const lastMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.addMonths)(now, -1));
        const [thisExpense, lastExpense, thisIncome, debts, cards, budget, score, lastScore] = await Promise.all([
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
            this.scoreSnapshotFor(userId, (0, date_fns_1.addMonths)(now, -1)),
        ]);
        const insights = [];
        const categoryName = await this.categoryNames();
        const thisMap = new Map(thisExpense.map((r) => [r.categoryId, (0, money_1.toNumber)(r._sum.amount ?? 0)]));
        for (const row of lastExpense) {
            const catId = row.categoryId ?? '';
            const last = (0, money_1.toNumber)(row._sum.amount ?? 0);
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
        for (const [catIdRaw, current] of thisMap) {
            const catId = catIdRaw ?? '';
            const last = (0, money_1.toNumber)(lastExpense.find((r) => r.categoryId === catId)?._sum.amount ?? 0);
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
        const income = (0, money_1.toNumber)(thisIncome._sum.amount ?? 0);
        const debtMinimums = debts.reduce((acc, d) => acc + (0, money_1.toNumber)(d.installmentAmount ?? 0), 0);
        if (income > 0 && debtMinimums / income > 0.4) {
            insights.push({
                type: 'INCOME_COMMITMENT',
                title: 'Renda muito comprometida',
                description: 'Seus pagamentos de dívidas representam uma parcela elevada da sua renda.',
                action: 'Ver plano de quitação',
                importance: 'HIGH',
            });
        }
        for (const card of cards) {
            const limit = (0, money_1.toNumber)(card.limit);
            const used = (0, money_1.toNumber)((await this.prisma.creditCardInstallment.aggregate({
                where: { cardId: card.id, status: { in: ['PENDING', 'OVERDUE'] } },
                _sum: { amount: true },
            }))._sum.amount ?? 0);
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
        const highRateDebt = debts.find((d) => (0, money_1.toNumber)(d.interestRate) > 80);
        if (highRateDebt) {
            insights.push({
                type: 'HIGH_INTEREST_DEBT',
                title: 'Juros elevados detectados',
                description: `A dívida com ${highRateDebt.creditor} tem taxa de ${highRateDebt.interestRate}%${highRateDebt.interestType === 'ANNUAL' ? ' ao ano' : ''}. Priorize quitá-la (estratégia avalanche).`,
                action: 'Criar plano de quitação',
                importance: 'HIGH',
            });
        }
        if (budget) {
            const over = budget.categories.filter((c) => (0, money_1.toNumber)(c.spent) > (0, money_1.toNumber)(c.limit));
            if (over.length > 0) {
                insights.push({
                    type: 'BUDGET_OVERRUN',
                    title: 'Orçamento estourado',
                    description: `${over.map((c) => c.name).join(', ')} ${over.length === 1 ? 'ultrapassou' : 'ultrapassaram'} o limite do mês.`,
                    action: 'Ajustar orçamento',
                    importance: 'HIGH',
                });
            }
            else {
                insights.push({
                    type: 'BUDGET_GOOD',
                    title: 'Dentro do orçamento',
                    description: 'Todas as categorias estão dentro do limite neste mês. Continue assim.',
                    importance: 'LOW',
                });
            }
        }
        if (score && lastScore && score - lastScore >= 5) {
            insights.push({
                type: 'POSITIVE_EVOLUTION',
                title: 'Você avançou no verdinho',
                description: `Seu nível subiu ${score - lastScore} pontos no último mês.`,
                importance: 'MEDIUM',
            });
        }
        const mainDebt = [...debts].sort((a, b) => (0, money_1.toNumber)(b.interestRate) - (0, money_1.toNumber)(a.interestRate))[0];
        if (mainDebt && (0, money_1.toNumber)(mainDebt.currentBalance) > 0 && income > 0) {
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
    async persist(userId, insights) {
        await this.prisma.$transaction([
            this.prisma.financialInsight.deleteMany({
                where: { userId, isRead: false, type: { in: insights.map((i) => i.type) } },
            }),
            ...insights.map((i) => this.prisma.financialInsight.create({
                data: {
                    userId,
                    type: i.type,
                    title: i.title,
                    description: i.description,
                    action: i.action,
                    importance: i.importance,
                },
            })),
        ]);
    }
    async list(userId, unreadOnly = false) {
        return this.prisma.financialInsight.findMany({
            where: { userId, ...(unreadOnly ? { isRead: false } : {}) },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async markRead(userId, id) {
        return this.prisma.financialInsight.updateMany({
            where: { id, userId },
            data: { isRead: true },
        });
    }
    async categoryNames() {
        const categories = await this.prisma.category.findMany();
        return new Map(categories.map((c) => [c.id, c.name]));
    }
    async currentScoreSnapshot(userId) {
        return this.scoreSnapshotFor(userId, new Date());
    }
    async scoreSnapshotFor(userId, month) {
        const from = (0, date_fns_1.startOfMonth)(month);
        const to = (0, date_fns_1.endOfMonth)(month);
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
        const inc = (0, money_1.toNumber)(income._sum.amount ?? 0);
        const exp = (0, money_1.toNumber)(expense._sum.amount ?? 0);
        const debtLoad = inc > 0 ? ((0, money_1.toNumber)(debts._sum.currentBalance ?? 0) / (inc * 12)) * 100 : 100;
        return Math.round(Math.min(100, Math.max(0, 100 - (inc > 0 ? ((exp / inc) * 100) : 100) * 0.5 - debtLoad * 0.25)));
    }
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InsightsService);
//# sourceMappingURL=insights.service.js.map