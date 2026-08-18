import { InsightsService } from './insights.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
export declare class InsightsController {
    private readonly insights;
    constructor(insights: InsightsService);
    generate(user: AuthUser): Promise<import("./insights.service").InsightDraft[]>;
    list(user: AuthUser, unread?: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").InsightType;
        description: string;
        title: string;
        action: string | null;
        importance: import("../generated/prisma/enums").DebtPriority;
        isRead: boolean;
    }[]>;
    markRead(user: AuthUser, id: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
}
