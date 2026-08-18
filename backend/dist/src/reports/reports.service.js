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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
const MAX_RANGE_MONTHS = 36;
let ReportsService = class ReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    resolveRange(from, to) {
        const toDate = to ? new Date(to) : new Date();
        const fromDate = from ? new Date(from) : (0, date_fns_1.startOfMonth)((0, date_fns_1.addMonths)(toDate, -5));
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            throw new app_exception_1.AppException('INVALID_PERIOD', 'Período inválido.');
        }
        if (fromDate > toDate) {
            throw new app_exception_1.AppException('INVALID_PERIOD', 'A data inicial não pode ser posterior à final.');
        }
        if ((0, date_fns_1.differenceInCalendarMonths)(fromDate, toDate) > MAX_RANGE_MONTHS) {
            throw new app_exception_1.AppException('INVALID_PERIOD', 'O período máximo é de 36 meses.');
        }
        return { from: (0, date_fns_1.startOfMonth)(fromDate), to: (0, date_fns_1.endOfMonth)(toDate) };
    }
    async summary(userId, from, to) {
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
        const incomeN = (0, money_1.toNumber)(income._sum.amount ?? 0);
        const expenseN = (0, money_1.toNumber)(expense._sum.amount ?? 0);
        return {
            period: { from: f, to: t },
            income: (0, money_1.roundMoney)(incomeN),
            expense: (0, money_1.roundMoney)(expenseN),
            net: (0, money_1.roundMoney)(incomeN - expenseN),
            savingsRate: incomeN > 0 ? Math.round(((incomeN - expenseN) / incomeN) * 1000) / 10 : 0,
            debtPaid: (0, money_1.roundMoney)(debtPayments._sum.amount ?? 0),
            cardPaid: (0, money_1.roundMoney)(cardUsed._sum.amount ?? 0),
            debtEvolution: scoreEvolution,
        };
    }
    async incomeExpenseSeries(userId, from, to) {
        const { from: f, to: t } = this.resolveRange(from, to);
        const months = (0, date_fns_1.differenceInCalendarMonths)(f, t) + 1;
        const rows = await this.prisma.transaction.groupBy({
            by: ['type', 'transactionDate'],
            where: { userId, status: 'CONFIRMED', transactionDate: { gte: f, lte: t } },
            _sum: { amount: true },
        });
        const byMonth = new Map();
        for (let i = 0; i < months; i++) {
            const m = (0, date_fns_1.addMonths)(f, i);
            byMonth.set(`${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`, { income: 0, expense: 0 });
        }
        for (const row of rows) {
            const key = `${row.transactionDate.getFullYear()}-${String(row.transactionDate.getMonth() + 1).padStart(2, '0')}`;
            const bucket = byMonth.get(key);
            if (!bucket)
                continue;
            if (row.type === 'INCOME')
                bucket.income += (0, money_1.toNumber)(row._sum.amount ?? 0);
            if (row.type === 'EXPENSE')
                bucket.expense += (0, money_1.toNumber)(row._sum.amount ?? 0);
        }
        return Array.from(byMonth.entries()).map(([month, v]) => ({
            month,
            income: (0, money_1.roundMoney)(v.income),
            expense: (0, money_1.roundMoney)(v.expense),
            net: (0, money_1.roundMoney)(v.income - v.expense),
        }));
    }
    async expensesByCategory(userId, from, to) {
        const { from: f, to: t } = this.resolveRange(from, to);
        const rows = await this.prisma.transaction.groupBy({
            by: ['categoryId'],
            where: { userId, type: 'EXPENSE', status: 'CONFIRMED', transactionDate: { gte: f, lte: t }, categoryId: { not: null } },
            _sum: { amount: true },
        });
        const categories = await this.prisma.category.findMany({
            where: { id: { in: rows.map((r) => r.categoryId).filter(Boolean) } },
        });
        const nameById = new Map(categories.map((c) => [c.id, c.name]));
        const total = rows.reduce((acc, r) => acc.plus(r._sum.amount ?? 0), (0, money_1.roundMoney)(0));
        return rows
            .map((r) => ({
            categoryId: r.categoryId,
            name: nameById.get(r.categoryId) ?? 'Outros',
            amount: (0, money_1.roundMoney)(r._sum.amount ?? 0),
            percent: total.isZero() ? 0 : Number(r._sum.amount.div(total).mul(100).toDecimalPlaces(1)),
        }))
            .sort((a, b) => (0, money_1.toNumber)(b.amount) - (0, money_1.toNumber)(a.amount));
    }
    async debtBalanceEvolution(userId, from, to) {
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
            startBalance: (0, money_1.roundMoney)(startBalance._sum.currentBalance ?? 0),
            currentBalance: (0, money_1.roundMoney)(current._sum.currentBalance ?? 0),
            paidInPeriod: (0, money_1.roundMoney)(paid._sum.amount ?? 0),
            reduction: (0, money_1.roundMoney)((0, money_1.toNumber)(startBalance._sum.currentBalance ?? 0) - (0, money_1.toNumber)(current._sum.currentBalance ?? 0)),
        };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map