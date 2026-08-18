import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goals.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
export declare class GoalsController {
    private readonly goals;
    private readonly audit;
    constructor(goals: GoalsService, audit: AuditService);
    list(user: AuthUser, status?: string): Promise<{
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        remainingAmount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
        projectedCompletion: string | null;
        requiredMonthlyContribution: number | null;
        id: string;
        name: string;
        status: import("../generated/prisma/enums").GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: import("../generated/prisma/enums").DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }[]>;
    create(user: AuthUser, dto: CreateGoalDto): Promise<{
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        remainingAmount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
        projectedCompletion: string | null;
        requiredMonthlyContribution: number | null;
        id: string;
        name: string;
        status: import("../generated/prisma/enums").GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: import("../generated/prisma/enums").DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }>;
    update(user: AuthUser, id: string, dto: UpdateGoalDto): Promise<{
        currentAmount: import("@prisma/client-runtime-utils").Decimal;
        remainingAmount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
        projectedCompletion: string | null;
        requiredMonthlyContribution: number | null;
        id: string;
        name: string;
        status: import("../generated/prisma/enums").GoalStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        priority: import("../generated/prisma/enums").DebtPriority;
        emoji: string | null;
        targetAmount: import("@prisma/client-runtime-utils").Decimal;
        targetDate: Date | null;
    }>;
    remove(user: AuthUser, id: string): Promise<{
        deleted: boolean;
    }>;
}
