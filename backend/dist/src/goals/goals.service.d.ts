import { DebtPriority, GoalStatus, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class GoalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string, status?: GoalStatus): Promise<{
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        remainingAmount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
        projectedCompletion: string | null;
        requiredMonthlyContribution: number | null;
        id: string;
        name: string;
        status: GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }[]>;
    getOwned(userId: string, id: string): Promise<{
        id: string;
        name: string;
        status: GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }>;
    create(userId: string, dto: {
        name: string;
        emoji?: string;
        targetAmount: number;
        currentAmount?: number;
        targetDate?: string;
        priority?: string;
    }): Promise<{
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        remainingAmount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
        projectedCompletion: string | null;
        requiredMonthlyContribution: number | null;
        id: string;
        name: string;
        status: GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }>;
    update(userId: string, id: string, dto: Prisma.GoalUpdateInput): Promise<{
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        remainingAmount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
        projectedCompletion: string | null;
        requiredMonthlyContribution: number | null;
        id: string;
        name: string;
        status: GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }>;
    remove(userId: string, id: string): Promise<{
        deleted: boolean;
    }>;
    private decorate;
}
