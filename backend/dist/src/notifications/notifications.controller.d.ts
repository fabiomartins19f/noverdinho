import { NotificationsService } from './notifications.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
declare class RegisterDeviceDto {
    token: string;
    platform?: string;
    apnsTopic?: string;
}
export declare class NotificationsController {
    private readonly notifications;
    constructor(notifications: NotificationsService);
    list(user: AuthUser, page?: string, perPage?: string): Promise<{
        items: {
            id: string;
            createdAt: Date;
            userId: string;
            type: import("../generated/prisma/enums").NotificationType;
            title: string;
            isRead: boolean;
            body: string;
            data: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
        total: number;
        unread: number;
        page: number;
        perPage: number;
        totalPages: number;
    }>;
    markRead(user: AuthUser, id: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    markAllRead(user: AuthUser): Promise<{
        updated: boolean;
    }>;
    registerDevice(user: AuthUser, dto: RegisterDeviceDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        token: string;
        platform: string;
        apnsTopic: string | null;
        lastSeenAt: Date;
    }>;
    unregisterDevice(user: AuthUser, token: string): Promise<{
        removed: boolean;
    }>;
}
export {};
