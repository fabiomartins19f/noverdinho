import { PrismaService } from '../prisma/prisma.service';
export declare class BudgetsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsert(userId: string, dto: {
        month: number;
        year: number;
        totalLimit: number;
        categories: {
            categoryId?: string;
            name: string;
            limit: number;
        }[];
    }): Promise<{
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
    get(userId: string, month: number, year: number): Promise<{
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
    private buildAlerts;
    list(userId: string, year?: number): Promise<({
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
    delete(userId: string, month: number, year: number): Promise<{
        deleted: boolean;
    }>;
}
