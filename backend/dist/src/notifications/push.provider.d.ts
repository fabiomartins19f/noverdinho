import { ConfigService } from '@nestjs/config';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../generated/prisma/client';
export interface PushPayload {
    userId: string;
    title: string;
    body: string;
    type: NotificationType;
    data?: Record<string, unknown>;
}
export declare class PushProvider {
    private readonly notifications;
    private readonly config;
    private readonly logger;
    private readonly configured;
    constructor(notifications: NotificationsService, config: ConfigService);
    send(payload: PushPayload): Promise<void>;
}
