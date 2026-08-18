import { Prisma, UserStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findById(id: string): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    create(data: {
        name: string;
        email: string;
        passwordHash: string;
        phone?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: string, passwordHash: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    revokeAllSessions(userId: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    getSummary(id: string): Promise<{
        status: UserStatus;
        summary: {
            balance: import("@prisma/client-runtime-utils").Decimal;
            totalDebt: import("@prisma/client-runtime-utils").Decimal;
            activeCards: number;
        };
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
