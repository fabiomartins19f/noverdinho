import { BudgetsService } from './budgets.service';
import { UpsertBudgetDto } from './dto/budgets.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
declare class BudgetQueryDto {
    year?: number;
}
export declare class BudgetsController {
    private readonly budgets;
    private readonly audit;
    constructor(budgets: BudgetsService, audit: AuditService);
    list(user: AuthUser, query: BudgetQueryDto): Promise<({
        categories: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string | null;
            limit: import("@prisma/client-runtime-utils").Decimal;
            budgetId: string;
            spent: import("@prisma/client-runtime-utils").Decimal;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        month: number;
        year: number;
        totalLimit: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    get(user: AuthUser, year: number, month: number): Promise<{
        totalSpent: import("@prisma/client-runtime-utils").Decimal;
        usedPercent: number;
        categories: {
            spent: import("@prisma/client-runtime-utils").Decimal;
            usedPercent: number;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string | null;
            limit: import("@prisma/client-runtime-utils").Decimal;
            budgetId: string;
        }[];
        alerts: {
            category: string;
            severity: string;
            message: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        month: number;
        year: number;
        totalLimit: import("@prisma/client-runtime-utils").Decimal;
    }>;
    upsert(user: AuthUser, dto: UpsertBudgetDto): Promise<{
        totalSpent: import("@prisma/client-runtime-utils").Decimal;
        usedPercent: number;
        categories: {
            spent: import("@prisma/client-runtime-utils").Decimal;
            usedPercent: number;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string | null;
            limit: import("@prisma/client-runtime-utils").Decimal;
            budgetId: string;
        }[];
        alerts: {
            category: string;
            severity: string;
            message: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        month: number;
        year: number;
        totalLimit: import("@prisma/client-runtime-utils").Decimal;
    }>;
    remove(user: AuthUser, year: number, month: number): Promise<{
        deleted: boolean;
    }>;
}
export {};
