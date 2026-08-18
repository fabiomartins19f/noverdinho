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
exports.FinancialHealthService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const financial_health_score_service_1 = require("./financial-health-score.service");
const money_1 = require("../common/utils/money");
let FinancialHealthService = class FinancialHealthService {
    prisma;
    scorer;
    constructor(prisma, scorer) {
        this.prisma = prisma;
        this.scorer = scorer;
    }
    async currentScore(userId) {
        const metrics = await this.gatherMetrics(userId);
        const score = this.scorer.compute(metrics);
        const evolution = await this.evolution(userId, 6);
        return { ...score, evolution };
    }
    async evolution(userId, months = 6) {
        const now = new Date();
        const points = [];
        for (let i = months - 1; i >= 0; i--) {
            const base = (0, date_fns_1.subMonths)((0, date_fns_1.startOfMonth)(now), i);
            const end = (0, date_fns_1.endOfMonth)(base);
            const snapshot = await this.gatherMetrics(userId, base, end);
            points.push({
                month: `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, '0')}`,
                score: this.scorer.compute(snapshot).score,
            });
        }
        return points;
    }
    async gatherMetrics(userId, from = (0, date_fns_1.startOfMonth)(new Date()), to = (0, date_fns_1.endOfMonth)(new Date())) {
        const [incomeAgg, expenseAgg, debtAgg, overdueDebts, overdueCard, cardUtil, budget, accounts, essentialAgg] = await Promise.all([
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
        const income = (0, money_1.toNumber)(incomeAgg._sum.amount ?? 0);
        const expenses = (0, money_1.toNumber)(expenseAgg._sum.amount ?? 0);
        const totalDebt = (0, money_1.toNumber)(debtAgg._sum.currentBalance ?? 0);
        const essential = Math.max((0, money_1.toNumber)(essentialAgg._sum.amount ?? 0), 1);
        const balance = (0, money_1.toNumber)(accounts._sum.currentBalance ?? 0);
        const cardInfo = cardUtil.map((card) => {
            const limit = (0, money_1.toNumber)(card.limit);
            return limit > 0 ? limit : 1;
        });
        const totalLimit = cardInfo.reduce((a, b) => a + b, 0);
        const cardInstallmentsAgg = await this.prisma.creditCardInstallment.aggregate({
            where: { userId, status: { in: ['PENDING', 'OVERDUE'] } },
            _sum: { amount: true },
        });
        const cardUsed = (0, money_1.toNumber)(cardInstallmentsAgg._sum.amount ?? 0);
        const debtMinimumsAgg = await this.prisma.debtInstallment.aggregate({
            where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: from, lte: to } },
            _sum: { totalAmount: true },
        });
        const debtMinimums = (0, money_1.toNumber)(debtMinimumsAgg._sum.totalAmount ?? 0);
        const commitmentRatio = income > 0 ? ((essential + debtMinimums) / income) * 100 : 100;
        return {
            commitmentRatio,
            income,
            totalDebt,
            overdueDebtCount: overdueDebts,
            overdueCardInstallmentCount: overdueCard,
            cardUtilization: totalLimit > 0 ? (cardUsed / totalLimit) * 100 : 0,
            savingsRate: income > 0 ? Math.max(0, (income - expenses) / income) : 0,
            budgetCategoriesOver: budget?.categories.filter((c) => (0, money_1.toNumber)(c.spent) > (0, money_1.toNumber)(c.limit)).length ?? 0,
            budgetCategoriesTotal: budget?.categories.length ?? 0,
            reserveMonths: balance / essential,
        };
    }
};
exports.FinancialHealthService = FinancialHealthService;
exports.FinancialHealthService = FinancialHealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        financial_health_score_service_1.FinancialHealthScoreService])
], FinancialHealthService);
//# sourceMappingURL=financial-health.service.js.map