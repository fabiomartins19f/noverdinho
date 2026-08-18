import { PrismaService } from '../prisma/prisma.service';
import { FinancialCapacityService } from './financial-capacity.service';
export type CanISpendStatus = 'SAFE' | 'CAUTION' | 'NOT_RECOMMENDED';
export interface CanISpendResult {
    status: CanISpendStatus;
    amount: number;
    reason: string;
    projectedBalance: number;
    futureCommitmentPercent: number;
    impact: {
        balanceAfter: number;
        balanceAfterPercent: number;
        vsSafetyFloor: number;
    };
}
export declare class CanISpendService {
    private readonly prisma;
    private readonly capacity;
    constructor(prisma: PrismaService, capacity: FinancialCapacityService);
    analyze(userId: string, amount: number): Promise<CanISpendResult>;
}
