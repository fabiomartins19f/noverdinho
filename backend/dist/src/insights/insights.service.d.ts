import { DebtPriority, InsightType, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export interface InsightDraft {
    type: InsightType;
    title: string;
    description: string;
    action?: string;
    importance: 'HIGH' | 'MEDIUM' | 'LOW';
}
export declare class InsightsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generate(userId: string): Promise<InsightDraft[]>;
    private persist;
    list(userId: string, unreadOnly?: boolean): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: InsightType;
        description: string;
        title: string;
        action: string | null;
        importance: DebtPriority;
        isRead: boolean;
    }[]>;
    markRead(userId: string, id: string): Promise<Prisma.BatchPayload>;
    private categoryNames;
    private currentScoreSnapshot;
    private scoreSnapshotFor;
}
