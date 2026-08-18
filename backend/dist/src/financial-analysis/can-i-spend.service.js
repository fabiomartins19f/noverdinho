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
exports.CanISpendService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const financial_capacity_service_1 = require("./financial-capacity.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let CanISpendService = class CanISpendService {
    prisma;
    capacity;
    constructor(prisma, capacity) {
        this.prisma = prisma;
        this.capacity = capacity;
    }
    async analyze(userId, amount) {
        if (!(amount > 0))
            throw new app_exception_1.AppException('INVALID_AMOUNT', 'Informe um valor maior que zero.');
        const now = (0, date_fns_1.startOfDay)(new Date());
        const horizon = (0, date_fns_1.addDays)(now, 30);
        const [accounts, income, expense, debtCommitments, cardCommitments, budget, essentials] = await Promise.all([
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
        const currentBalance = (0, money_1.toNumber)(accounts._sum.currentBalance ?? 0);
        const projectedIncome = (0, money_1.toNumber)(income._sum.amount ?? 0);
        const projectedExpenses = (0, money_1.toNumber)(expense._sum.amount ?? 0);
        const debtDue = (0, money_1.toNumber)(debtCommitments._sum.totalAmount ?? 0);
        const cardDue = (0, money_1.toNumber)(cardCommitments._sum.amount ?? 0);
        const essentialMonthly = Math.max((0, money_1.toNumber)(essentials._sum.amount ?? 0) / 3, 0);
        const safetyFloor = essentialMonthly * 0.2;
        const projectedBalance = currentBalance + projectedIncome - projectedExpenses - debtDue - cardDue;
        const balanceAfter = projectedBalance - amount;
        const futureCommitment = projectedBalance > 0 ? ((debtDue + cardDue + amount) / (projectedBalance + amount)) * 100 : 100;
        let status;
        let reason;
        if (balanceAfter < safetyFloor) {
            status = 'NOT_RECOMMENDED';
            reason =
                'A compra reduziria sua margem financeira abaixo do nível de segurança, considerando seus compromissos dos próximos 30 dias.';
        }
        else if (futureCommitment > 80) {
            status = 'NOT_RECOMMENDED';
            reason = 'A compra elevaria seu comprometimento futuro acima de 80% da sua disponibilidade projetada.';
        }
        else if (balanceAfter < safetyFloor * 2) {
            status = 'CAUTION';
            reason = 'Você conseguiria pagar, mas ficaria com margem apertada após os compromissos dos próximos 30 dias.';
        }
        else {
            status = 'SAFE';
            reason = 'Seus saldo e compromissos projetados dos próximos 30 dias suportam a compra com folga.';
        }
        return {
            status,
            amount,
            reason,
            projectedBalance: (0, money_1.toNumber)((0, money_1.roundMoney)(projectedBalance)),
            futureCommitmentPercent: Math.round(futureCommitment * 10) / 10,
            impact: {
                balanceAfter: (0, money_1.toNumber)((0, money_1.roundMoney)(balanceAfter)),
                balanceAfterPercent: balanceAfter >= 0 ? Math.min(100, (amount / Math.max(1, balanceAfter + amount)) * 100) : 100,
                vsSafetyFloor: (0, money_1.toNumber)((0, money_1.roundMoney)(balanceAfter - safetyFloor)),
            },
        };
    }
};
exports.CanISpendService = CanISpendService;
exports.CanISpendService = CanISpendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        financial_capacity_service_1.FinancialCapacityService])
], CanISpendService);
//# sourceMappingURL=can-i-spend.service.js.map