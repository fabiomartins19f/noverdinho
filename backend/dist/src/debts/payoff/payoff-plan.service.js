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
exports.PayoffPlanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const app_exception_1 = require("../../common/exceptions/app.exception");
const money_1 = require("../../common/utils/money");
const payoff_simulation_service_1 = require("./payoff-simulation.service");
const debts_service_1 = require("../debts.service");
let PayoffPlanService = class PayoffPlanService {
    prisma;
    simulation;
    debts;
    constructor(prisma, simulation, debts) {
        this.prisma = prisma;
        this.simulation = simulation;
        this.debts = debts;
    }
    async createPlan(userId, dto) {
        const debts = await this.prisma.debt.findMany({
            where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] }, currentBalance: { gt: 0 } },
        });
        const inputs = debts.map((debt) => ({
            id: debt.id,
            creditor: debt.creditor,
            currentBalance: (0, money_1.toNumber)(debt.currentBalance),
            annualRate: (0, money_1.toNumber)(debt.interestRate) * (debt.interestType === 'MONTHLY' ? 12 : 1),
            installmentAmount: Math.max((0, money_1.toNumber)(debt.installmentAmount ?? 0), 0),
            totalInstallments: debt.totalInstallments,
            paidInstallments: debt.paidInstallments,
            status: debt.status,
            type: debt.type,
            dueDate: debt.dueDate.toISOString(),
        }));
        const result = this.simulation.simulate({
            debts: inputs,
            monthlyBudget: dto.monthlyBudget,
            strategy: dto.strategy,
        });
        if (!result.feasible) {
            throw new app_exception_1.AppException('BUDGET_BELOW_MINIMUM', 'O valor mensal informado é menor que a soma das parcelas mínimas das suas dívidas.');
        }
        const plan = await this.prisma.debtPayoffPlan.create({
            data: {
                userId,
                strategy: dto.strategy,
                monthlyBudget: (0, money_1.roundMoney)(dto.monthlyBudget),
                estimatedMonths: result.estimatedMonths,
                estimatedInterest: result.estimatedInterest,
                estimatedTotal: result.estimatedTotal,
                baselineInterest: result.baselineInterest,
                projectedPayoffDate: result.projectedPayoffDate ? new Date(result.projectedPayoffDate) : null,
            },
        });
        await this.prisma.debtPayoffPlanItem.createMany({
            data: result.order.map((item) => ({
                planId: plan.id,
                debtId: item.debtId,
                order: item.order,
                payoffMonth: item.payoffMonth,
                projectedPayoffDate: new Date(item.projectedPayoffDate),
                amountPerMonth: (0, money_1.roundMoney)(item.amountPerMonth),
            })),
        });
        return {
            plan,
            items: result.order,
            economy: result.economy,
            baselineInterest: result.baselineInterest,
            feasible: true,
        };
    }
    async listPlans(userId) {
        return this.prisma.debtPayoffPlan.findMany({
            where: { userId },
            include: { items: { include: { debt: true }, orderBy: { order: 'asc' } } },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
    }
    async getPlan(userId, planId) {
        const plan = await this.prisma.debtPayoffPlan.findFirst({
            where: { id: planId, userId },
            include: { items: { include: { debt: true }, orderBy: { order: 'asc' } } },
        });
        if (!plan)
            throw new app_exception_1.AppException('DEBT_NOT_FOUND', 'Plano de quitação não encontrado.', 404);
        return plan;
    }
    async preview(userId, dto) {
        const debts = await this.prisma.debt.findMany({
            where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] }, currentBalance: { gt: 0 } },
        });
        const inputs = debts.map((debt) => ({
            id: debt.id,
            creditor: debt.creditor,
            currentBalance: (0, money_1.toNumber)(debt.currentBalance),
            annualRate: (0, money_1.toNumber)(debt.interestRate) * (debt.interestType === 'MONTHLY' ? 12 : 1),
            installmentAmount: Math.max((0, money_1.toNumber)(debt.installmentAmount ?? 0), 0),
            totalInstallments: debt.totalInstallments,
            paidInstallments: debt.paidInstallments,
            status: debt.status,
            type: debt.type,
            dueDate: debt.dueDate.toISOString(),
        }));
        return this.simulation.simulate({ debts: inputs, monthlyBudget: dto.monthlyBudget, strategy: dto.strategy });
    }
};
exports.PayoffPlanService = PayoffPlanService;
exports.PayoffPlanService = PayoffPlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payoff_simulation_service_1.PayoffSimulationService,
        debts_service_1.DebtsService])
], PayoffPlanService);
//# sourceMappingURL=payoff-plan.service.js.map