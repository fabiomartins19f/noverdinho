import { NotificationType, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, input: {
        type: NotificationType;
        title: string;
        body: string;
        data?: Prisma.InputJsonValue;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: NotificationType;
        title: string;
        isRead: boolean;
        body: string;
        data: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    list(userId: string, page?: number, perPage?: number): Promise<{
        items: {
            id: string;
            createdAt: Date;
            userId: string;
            type: NotificationType;
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
    markRead(userId: string, id: string): Promise<Prisma.BatchPayload>;
    markAllRead(userId: string): Promise<{
        updated: boolean;
    }>;
    registerDevice(userId: string, dto: {
        token: string;
        platform?: string;
        apnsTopic?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        token: string;
        platform: string;
        apnsTopic: string | null;
        lastSeenAt: Date;
    }>;
    unregisterDevice(userId: string, token: string): Promise<{
        removed: boolean;
    }>;
    devicesFor(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        token: string;
        platform: string;
        apnsTopic: string | null;
        lastSeenAt: Date;
    }[]>;
}
