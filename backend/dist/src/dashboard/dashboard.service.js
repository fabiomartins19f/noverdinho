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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const financial_health_service_1 = require("../financial-health/financial-health.service");
const money_1 = require("../common/utils/money");
const ESSENTIAL_CATEGORIES = ['Moradia', 'Alimentação', 'Transporte', 'Saúde'];
let DashboardService = class DashboardService {
    prisma;
    health;
    constructor(prisma, health) {
        this.prisma = prisma;
        this.health = health;
    }
    async getDashboard(userId) {
        const now = (0, date_fns_1.startOfDay)(new Date());
        const monthStart = (0, date_fns_1.startOfMonth)(now);
        const monthEnd = (0, date_fns_1.endOfMonth)(now);
        const horizon = (0, date_fns_1.addDays)(now, 15);
        const [accounts, income, expense, debtAgg, debtPayments, debtInstallments15d, cardInstallments15d, score, insights, budget] = await Promise.all([
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
        const balance = (0, money_1.roundMoney)(accounts._sum.currentBalance ?? 0);
        const monthIncome = (0, money_1.roundMoney)(income._sum.amount ?? 0);
        const monthExpense = (0, money_1.roundMoney)(expense._sum.amount ?? 0);
        const totalDebt = (0, money_1.roundMoney)(debtAgg._sum.currentBalance ?? 0);
        const monthDebtPaid = (0, money_1.roundMoney)(debtPayments._sum.amount ?? 0);
        const upcoming = [
            ...debtInstallments15d.map((i) => ({
                type: 'DEBT_INSTALLMENT',
                label: i.debt.creditor,
                amount: (0, money_1.roundMoney)(i.totalAmount),
                dueDate: i.dueDate,
                overdue: i.status === 'OVERDUE',
            })),
            ...cardInstallments15d.map((i) => ({
                type: 'CARD_INSTALLMENT',
                label: i.card.name,
                amount: (0, money_1.roundMoney)(i.amount),
                dueDate: i.dueDate,
                overdue: i.status === 'OVERDUE',
            })),
        ].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
        const upcomingTotal = (0, money_1.roundMoney)(upcoming.reduce((acc, c) => acc.plus(c.amount), (0, money_1.roundMoney)(0)));
        const essentialMonthly = (0, money_1.toNumber)((await this.prisma.transaction.aggregate({
            where: {
                userId,
                type: 'EXPENSE',
                status: 'CONFIRMED',
                transactionDate: { gte: monthStart, lte: monthEnd },
                category: { name: { in: ESSENTIAL_CATEGORIES } },
            },
            _sum: { amount: true },
        }))._sum.amount ?? 0);
        const recommendedLimit = Math.max(essentialMonthly * 1.2, (0, money_1.toNumber)(monthIncome) * 0.5);
        const alerts = [];
        if ((0, money_1.toNumber)(upcomingTotal) > recommendedLimit) {
            alerts.push({
                severity: 'WARNING',
                title: 'Atenção',
                message: 'Suas despesas previstas para os próximos 15 dias estão acima do seu limite recomendado.',
            });
        }
        if (budget && (0, money_1.toNumber)(monthExpense) > (0, money_1.toNumber)(budget.totalLimit)) {
            alerts.push({
                severity: 'DANGER',
                title: 'Orçamento estourado',
                message: 'Suas despesas do mês ultrapassaram o orçamento definido.',
            });
        }
        const overdueCount = debtInstallments15d.filter((i) => i.status === 'OVERDUE').length +
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
                net: (0, money_1.roundMoney)((0, money_1.toNumber)(monthIncome) - (0, money_1.toNumber)(monthExpense)),
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        financial_health_service_1.FinancialHealthService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map