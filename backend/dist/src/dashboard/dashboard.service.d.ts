import { PrismaService } from '../prisma/prisma.service';
import { FinancialHealthService } from '../financial-health/financial-health.service';
export declare class DashboardService {
    private readonly prisma;
    private readonly health;
    constructor(prisma: PrismaService, health: FinancialHealthService);
    getDashboard(userId: string): Promise<{
        balance: import("@prisma/client-runtime-utils").Decimal;
        month: {
            income: import("@prisma/client-runtime-utils").Decimal;
            expense: import("@prisma/client-runtime-utils").Decimal;
            net: import("@prisma/client-runtime-utils").Decimal;
        };
        debts: {
            total: import("@prisma/client-runtime-utils").Decimal;
            paidThisMonth: import("@prisma/client-runtime-utils").Decimal;
        };
        upcoming: {
            type: string;
            label: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            dueDate: Date;
            overdue: boolean;
        }[];
        upcomingTotal: import("@prisma/client-runtime-utils").Decimal;
        alerts: {
            severity: "WARNING" | "DANGER" | "INFO";
            title: string;
            message: string;
        }[];
        score: {
            evolution: {
                month: string;
                score: number;
            }[];
            score: number;
            band: "CRITICAL" | "ATTENTION" | "EVOLVING" | "ON_TRACK" | "EXCELLENT";
            bandLabel: string;
            message: string;
            breakdown: Array<{
                factor: string;
                weight: number;
                value: number;
            }>;
        };
        insights: {
            id: string;
            createdAt: Date;
            userId: string;
            type: import("../generated/prisma/enums").InsightType;
            description: string;
            title: string;
            action: string | null;
            importance: import("../generated/prisma/enums").DebtPriority;
            isRead: boolean;
        }[];
    }>;
}
