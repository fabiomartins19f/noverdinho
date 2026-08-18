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
exports.DebtsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let DebtsService = class DebtsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    ACTIVE_STATUSES = ['ACTIVE', 'OVERDUE', 'NEGOTIATED'];
    async list(userId, filters) {
        const debts = await this.prisma.debt.findMany({
            where: {
                userId,
                ...(filters.status ? { status: filters.status } : {}),
                ...(filters.type ? { type: filters.type } : {}),
                ...(filters.priority ? { priority: filters.priority } : {}),
            },
            include: {
                installments: {
                    where: { status: { in: ['PENDING', 'OVERDUE'] } },
                    orderBy: { dueDate: 'asc' },
                    take: 1,
                },
            },
            orderBy: [{ status: 'asc' }, { dueDate: 'asc' }],
        });
        return debts.map((debt) => this.decorate(debt));
    }
    async overview(userId) {
        const [activeAgg, paidOffAgg, byStatus] = await Promise.all([
            this.prisma.debt.aggregate({
                where: { userId, status: { in: this.ACTIVE_STATUSES } },
                _sum: { currentBalance: true, originalAmount: true },
            }),
            this.prisma.debt.aggregate({
                where: { userId, status: 'PAID_OFF' },
                _sum: { currentBalance: true },
            }),
            this.prisma.debt.groupBy({
                by: ['status'],
                where: { userId },
                _count: { _all: true },
            }),
        ]);
        return {
            totalBalance: (0, money_1.roundMoney)(activeAgg._sum.currentBalance ?? 0),
            totalOriginal: (0, money_1.roundMoney)(activeAgg._sum.originalAmount ?? 0),
            paidOffTotal: (0, money_1.roundMoney)(paidOffAgg._sum.currentBalance ?? 0),
            counts: byStatus,
        };
    }
    async getOwned(userId, id) {
        const debt = await this.prisma.debt.findFirst({ where: { id, userId } });
        if (!debt)
            throw new app_exception_1.AppException('DEBT_NOT_FOUND', 'Dívida não encontrada.', 404);
        return debt;
    }
    async detail(userId, id) {
        const debt = await this.prisma.debt.findFirst({
            where: { id, userId },
            include: {
                installments: { orderBy: [{ status: 'asc' }, { dueDate: 'asc' }] },
                payments: { orderBy: { paymentDate: 'desc' } },
            },
        });
        if (!debt)
            throw new app_exception_1.AppException('DEBT_NOT_FOUND', 'Dívida não encontrada.', 404);
        return this.decorate(debt);
    }
    async create(userId, dto) {
        const original = (0, money_1.money)(dto.originalAmount);
        const balance = dto.currentBalance !== undefined ? (0, money_1.money)(dto.currentBalance) : original;
        const debt = await this.prisma.$transaction(async (tx) => {
            const created = await tx.debt.create({
                data: {
                    userId,
                    creditor: dto.creditor,
                    type: dto.type,
                    originalAmount: original,
                    currentBalance: balance,
                    interestRate: dto.interestRate ?? 0,
                    interestType: dto.interestType ?? 'ANNUAL',
                    penaltyRate: dto.penaltyRate ?? 0,
                    installmentAmount: dto.installmentAmount ? (0, money_1.money)(dto.installmentAmount) : null,
                    totalInstallments: dto.totalInstallments ?? null,
                    dueDate: new Date(dto.dueDate),
                    status: dto.status ?? 'ACTIVE',
                    priority: dto.priority ?? 'MEDIUM',
                    notes: dto.notes,
                },
            });
            if (dto.totalInstallments && dto.totalInstallments > 1) {
                await this.generateSchedule(tx, created.id, userId, balance, dto.totalInstallments);
            }
            return created;
        });
        return this.detail(userId, debt.id);
    }
    async generateSchedule(tx, debtId, userId, balance, totalInstallments) {
        const base = balance.div(totalInstallments);
        const remainder = balance.minus(base.times(totalInstallments));
        const monthlyRate = 0;
        for (let i = 0; i < totalInstallments; i++) {
            const principal = i === totalInstallments - 1 ? base.plus(remainder) : base;
            const interest = principal.times(monthlyRate);
            const total = principal.plus(interest);
            await tx.debtInstallment.create({
                data: {
                    debtId,
                    userId,
                    installmentNumber: i + 1,
                    dueDate: (0, date_fns_1.addMonths)(new Date(), i + 1),
                    principalAmount: (0, money_1.roundMoney)(principal),
                    interestAmount: (0, money_1.roundMoney)(interest),
                    penaltyAmount: (0, money_1.money)(0),
                    totalAmount: (0, money_1.roundMoney)(total),
                    paidAmount: (0, money_1.money)(0),
                },
            });
        }
    }
    async update(userId, id, dto) {
        await this.getOwned(userId, id);
        return this.prisma.debt.update({ where: { id }, data: dto });
    }
    async remove(userId, id) {
        await this.getOwned(userId, id);
        const hasPayments = await this.prisma.debtPayment.count({ where: { debtId: id } });
        if (hasPayments > 0) {
            return this.prisma.debt.update({ where: { id }, data: { status: 'CANCELED' } });
        }
        await this.prisma.debt.delete({ where: { id } });
        return { deleted: true };
    }
    async registerPayment(userId, debtId, dto) {
        const debt = await this.getOwned(userId, debtId);
        const amount = (0, money_1.money)(dto.amount);
        if (amount.isZero())
            throw new app_exception_1.AppException('INVALID_AMOUNT', 'Valor do pagamento deve ser maior que zero.');
        let remaining = amount;
        let principalPaid = (0, money_1.money)(0);
        let interestPaid = (0, money_1.money)(0);
        let penaltyPaid = (0, money_1.money)(0);
        let paidCount = 0;
        let nextInstallmentId = dto.installmentId ?? null;
        const installments = nextInstallmentId
            ? [await this.prisma.debtInstallment.findFirst({ where: { id: nextInstallmentId, debtId } })]
            : await this.prisma.debtInstallment.findMany({
                where: { debtId, status: { in: ['OVERDUE', 'PENDING'] } },
                orderBy: [{ status: 'desc' }, { dueDate: 'asc' }],
            });
        if (!nextInstallmentId && installments.length === 0) {
            throw new app_exception_1.AppException('DEBT_INSTALLMENT_NOT_FOUND', 'Esta dívida não possui parcelas pendentes.');
        }
        if (installments[0] === null) {
            throw new app_exception_1.AppException('DEBT_INSTALLMENT_NOT_FOUND', 'Parcela não encontrada.', 404);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            for (const installment of installments) {
                if (remaining.lte(0))
                    break;
                const owed = installment.totalAmount.minus(installment.paidAmount);
                if (owed.lte(0))
                    continue;
                const paid = remaining.lt(owed) ? remaining : owed;
                const penaltyOwed = (0, money_1.money)(installment.penaltyAmount).sub((0, money_1.money)(installment.paidAmount));
                const allocatedPenalty = paid.lt(penaltyOwed) ? paid : penaltyOwed;
                const interestOwed = (0, money_1.money)(installment.interestAmount);
                const afterPenalty = paid.sub(allocatedPenalty);
                const allocatedInterest = afterPenalty.lt(interestOwed) ? afterPenalty : interestOwed;
                const allocatedPrincipal = afterPenalty.sub(allocatedInterest);
                penaltyPaid = penaltyPaid.plus(allocatedPenalty);
                interestPaid = interestPaid.plus(allocatedInterest);
                principalPaid = principalPaid.plus(allocatedPrincipal);
                const newPaidAmount = installment.paidAmount.plus(paid);
                const fullyPaid = newPaidAmount.gte(installment.totalAmount.minus(0.004));
                await tx.debtInstallment.update({
                    where: { id: installment.id },
                    data: {
                        paidAmount: (0, money_1.roundMoney)(newPaidAmount),
                        status: fullyPaid ? 'PAID' : installment.status,
                        paidAt: fullyPaid ? (dto.paymentDate ? new Date(dto.paymentDate) : new Date()) : null,
                    },
                });
                if (fullyPaid)
                    paidCount++;
                remaining = remaining.minus(paid);
            }
            const totalPaid = amount.minus(remaining);
            const payment = await tx.debtPayment.create({
                data: {
                    debtId,
                    userId,
                    amount: (0, money_1.roundMoney)(totalPaid),
                    paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
                    note: dto.note,
                    installmentId: nextInstallmentId,
                },
            });
            const newBalance = debt.currentBalance.minus(principalPaid);
            const settled = newBalance.lte(0.004);
            const updatedDebt = await tx.debt.update({
                where: { id: debtId },
                data: {
                    currentBalance: settled ? (0, money_1.money)(0) : (0, money_1.roundMoney)(newBalance),
                    paidInstallments: { increment: paidCount },
                    status: settled ? 'PAID_OFF' : debt.status,
                },
            });
            return { payment, updatedDebt, principalPaid, interestPaid, penaltyPaid, totalPaid, settled };
        });
        return {
            payment: result.payment,
            debt: this.decorate(result.updatedDebt),
            allocation: {
                principal: (0, money_1.roundMoney)(result.principalPaid),
                interest: (0, money_1.roundMoney)(result.interestPaid),
                penalty: (0, money_1.roundMoney)(result.penaltyPaid),
                unallocated: (0, money_1.roundMoney)(remaining),
            },
            settled: result.settled,
        };
    }
    async accrueMonthlyCharges() {
        const overdue = await this.prisma.debt.findMany({
            where: { status: 'OVERDUE', currentBalance: { gt: 0 } },
        });
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        for (const debt of overdue) {
            const existing = await this.prisma.debtInstallment.findFirst({
                where: { debtId: debt.id, dueDate: { gte: monthStart } },
            });
            if (existing)
                continue;
            const balance = (0, money_1.money)(debt.currentBalance);
            const monthlyRate = debt.interestType === 'ANNUAL' ? (0, money_1.money)(debt.interestRate).div(12) : (0, money_1.money)(debt.interestRate);
            const interest = balance.times(monthlyRate).div(100);
            const penalty = balance.times(debt.penaltyRate).div(100);
            const total = interest.plus(penalty);
            if (total.lte(0.004))
                continue;
            await this.prisma.debtInstallment.create({
                data: {
                    debtId: debt.id,
                    userId: debt.userId,
                    installmentNumber: (debt.totalInstallments ?? 0) + 1,
                    dueDate: (0, date_fns_1.addMonths)(now, 1),
                    principalAmount: (0, money_1.money)(0),
                    interestAmount: (0, money_1.roundMoney)(interest),
                    penaltyAmount: (0, money_1.roundMoney)(penalty),
                    totalAmount: (0, money_1.roundMoney)(total),
                    paidAmount: (0, money_1.money)(0),
                    status: 'OVERDUE',
                },
            });
        }
        return { processed: overdue.length };
    }
    decorate(debt) {
        const original = (0, money_1.money)(debt.originalAmount);
        const balance = (0, money_1.money)(debt.currentBalance);
        const paid = original.minus(balance).lt(0) ? (0, money_1.money)(0) : original.minus(balance);
        const progress = original.isZero() ? 0 : Number(paid.div(original).mul(100).toDecimalPlaces(1));
        return {
            ...debt,
            progressPercent: progress,
            paidAmount: (0, money_1.roundMoney)(paid),
            nextInstallment: Array.isArray(debt.installments) && debt.installments.length ? debt.installments[0] : null,
        };
    }
};
exports.DebtsService = DebtsService;
exports.DebtsService = DebtsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DebtsService);
//# sourceMappingURL=debts.service.js.map