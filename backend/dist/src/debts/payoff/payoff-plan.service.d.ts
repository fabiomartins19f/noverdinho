import { PlanStrategy } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PayoffSimulationService } from './payoff-simulation.service';
import { DebtsService } from '../debts.service';
export declare class PayoffPlanService {
    private readonly prisma;
    private readonly simulation;
    private readonly debts;
    constructor(prisma: PrismaService, simulation: PayoffSimulationService, debts: DebtsService);
    createPlan(userId: string, dto: {
        monthlyBudget: number;
        strategy: PlanStrategy;
    }): Promise<{
        plan: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            strategy: PlanStrategy;
            monthlyBudget: import("@prisma/client-runtime-utils").Decimal;
            estimatedMonths: number;
            estimatedInterest: import("@prisma/client-runtime-utils").Decimal;
            estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
            baselineInterest: import("@prisma/client-runtime-utils").Decimal | null;
            projectedPayoffDate: Date | null;
        };
        items: {
            debtId: string;
            creditor: string;
            order: number;
            payoffMonth: number;
            projectedPayoffDate: string;
            amountPerMonth: number;
        }[];
        economy: number;
        baselineInterest: number;
        feasible: boolean;
    }>;
    listPlans(userId: string): Promise<({
        items: ({
            debt: {
                id: string;
                status: import("../../generated/prisma/enums").DebtStatus;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                type: import("../../generated/prisma/enums").DebtType;
                currentBalance: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date;
                creditor: string;
                originalAmount: import("@prisma/client-runtime-utils").Decimal;
                interestRate: import("@prisma/client-runtime-utils").Decimal;
                interestType: import("../../generated/prisma/enums").InterestType;
                penaltyRate: import("@prisma/client-runtime-utils").Decimal;
                installmentAmount: import("@prisma/client-runtime-utils").Decimal | null;
                totalInstallments: number | null;
                paidInstallments: number;
                priority: import("../../generated/prisma/enums").DebtPriority;
                notes: string | null;
            };
        } & {
            id: string;
            debtId: string;
            projectedPayoffDate: Date;
            planId: string;
            order: number;
            payoffMonth: number;
            amountPerMonth: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        strategy: PlanStrategy;
        monthlyBudget: import("@prisma/client-runtime-utils").Decimal;
        estimatedMonths: number;
        estimatedInterest: import("@prisma/client-runtime-utils").Decimal;
        estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        baselineInterest: import("@prisma/client-runtime-utils").Decimal | null;
        projectedPayoffDate: Date | null;
    })[]>;
    getPlan(userId: string, planId: string): Promise<{
        items: ({
            debt: {
                id: string;
                status: import("../../generated/prisma/enums").DebtStatus;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                type: import("../../generated/prisma/enums").DebtType;
                currentBalance: import("@prisma/client-runtime-utils").Decimal;
                dueDate: Date;
                creditor: string;
                originalAmount: import("@prisma/client-runtime-utils").Decimal;
                interestRate: import("@prisma/client-runtime-utils").Decimal;
                interestType: import("../../generated/prisma/enums").InterestType;
                penaltyRate: import("@prisma/client-runtime-utils").Decimal;
                installmentAmount: import("@prisma/client-runtime-utils").Decimal | null;
                totalInstallments: number | null;
                paidInstallments: number;
                priority: import("../../generated/prisma/enums").DebtPriority;
                notes: string | null;
            };
        } & {
            id: string;
            debtId: string;
            projectedPayoffDate: Date;
            planId: string;
            order: number;
            payoffMonth: number;
            amountPerMonth: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        strategy: PlanStrategy;
        monthlyBudget: import("@prisma/client-runtime-utils").Decimal;
        estimatedMonths: number;
        estimatedInterest: import("@prisma/client-runtime-utils").Decimal;
        estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        baselineInterest: import("@prisma/client-runtime-utils").Decimal | null;
        projectedPayoffDate: Date | null;
    }>;
    preview(userId: string, dto: {
        monthlyBudget: number;
        strategy: PlanStrategy;
    }): Promise<import("./payoff-simulation.service").PayoffSimulationResult>;
}
