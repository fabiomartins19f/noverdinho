import { ReportsService } from './reports.service';
import { ReportPeriodDto } from './dto/reports.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
export declare class ReportsController {
    private readonly reports;
    constructor(reports: ReportsService);
    summary(user: AuthUser, query: ReportPeriodDto): Promise<{
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
    incomeExpense(user: AuthUser, query: ReportPeriodDto): Promise<{
        month: string;
        income: import("@prisma/client-runtime-utils").Decimal;
        expense: import("@prisma/client-runtime-utils").Decimal;
        net: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
    expensesByCategory(user: AuthUser, query: ReportPeriodDto): Promise<{
        categoryId: string | null;
        name: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        percent: number;
    }[]>;
}
