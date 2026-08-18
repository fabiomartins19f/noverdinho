import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { DebtsService } from '../debts/debts.service';
import { InsightsService } from '../insights/insights.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PushProvider } from '../notifications/push.provider';
import { PrismaService } from '../prisma/prisma.service';
export declare const RECURRING_QUEUE = "noverdinho-recurring";
export declare class RecurringProcessor extends WorkerHost {
    private readonly prisma;
    private readonly debts;
    private readonly insights;
    private readonly notifications;
    private readonly push;
    private readonly logger;
    constructor(prisma: PrismaService, debts: DebtsService, insights: InsightsService, notifications: NotificationsService, push: PushProvider);
    process(job: Job): Promise<unknown>;
    private dailyScan;
    private monthlyCharges;
    private generateInsights;
}
