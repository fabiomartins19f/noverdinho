import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private resolveRange;
    summary(userId: string, from?: string, to?: string): Promise<{
        period: {
            from: Date;
            to: Date;
        };
        income: import("@prisma/client-runtime-utils").Decimal;
        expense: import("@prisma/client-runtime-utils").Decimal;
        net: import("@prisma/client-runtime-utils").Decimal;
        savingsRate: number;
        debtPaid: import("@prisma/client-runtime-utils").Decimal;
        cardPaid: import("@prisma/client-runtime-utils").Decimal;
        debtEvolution: {
            startBalance: import("@prisma/client-runtime-utils").Decimal;
            currentBalance: import("@prisma/client-runtime-utils").Decimal;
            paidInPeriod: import("@prisma/client-runtime-utils").Decimal;
            reduction: import("@prisma/client-runtime-utils").Decimal;
        };
    }>;
    incomeExpenseSeries(userId: string, from?: string, to?: string): Promise<{
        month: string;
        income: import("@prisma/client-runtime-utils").Decimal;
        expense: import("@prisma/client-runtime-utils").Decimal;
        net: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    expensesByCategory(userId: string, from?: string, to?: string): Promise<{
        categoryId: string | null;
        name: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
    }[]>;
    private debtBalanceEvolution;
}
