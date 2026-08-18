import { PayoffPlanService } from './payoff-plan.service';
import { AuthUser } from '../../common/decorators/current-user.decorator';
declare class PlanInputDto {
    monthlyBudget: number;
    strategy: 'AVALANCHE' | 'SNOWBALL';
}
export declare class PayoffPlanController {
    private readonly payoff;
    constructor(payoff: PayoffPlanService);
    preview(user: AuthUser, dto: PlanInputDto): Promise<import("./payoff-simulation.service").PayoffSimulationResult>;
    create(user: AuthUser, dto: PlanInputDto): Promise<{
        plan: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            strategy: import("../../generated/prisma/enums").PlanStrategy;
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
    list(user: AuthUser): Promise<({
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
        strategy: import("../../generated/prisma/enums").PlanStrategy;
        monthlyBudget: import("@prisma/client-runtime-utils").Decimal;
        estimatedMonths: number;
        estimatedInterest: import("@prisma/client-runtime-utils").Decimal;
        estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        baselineInterest: import("@prisma/client-runtime-utils").Decimal | null;
        projectedPayoffDate: Date | null;
    })[]>;
    get(user: AuthUser, id: string): Promise<{
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
        strategy: import("../../generated/prisma/enums").PlanStrategy;
        monthlyBudget: import("@prisma/client-runtime-utils").Decimal;
        estimatedMonths: number;
        estimatedInterest: import("@prisma/client-runtime-utils").Decimal;
        estimatedTotal: import("@prisma/client-runtime-utils").Decimal;
        baselineInterest: import("@prisma/client-runtime-utils").Decimal | null;
        projectedPayoffDate: Date | null;
    }>;
}
export {};
