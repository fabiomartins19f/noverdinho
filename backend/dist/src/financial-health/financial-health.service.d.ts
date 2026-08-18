import { PrismaService } from '../prisma/prisma.service';
import { FinancialHealthScoreService } from './financial-health-score.service';
export declare class FinancialHealthService {
    private readonly prisma;
    private readonly scorer;
    constructor(prisma: PrismaService, scorer: FinancialHealthScoreService);
    currentScore(userId: string): Promise<{
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
    }>;
    evolution(userId: string, months?: number): Promise<{
        month: string;
        score: number;
    }[]>;
    private gatherMetrics;
}
