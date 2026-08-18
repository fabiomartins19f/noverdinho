import { AuthUser } from '../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditService } from '../audit/audit.service';
import type { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    private readonly audit;
    constructor(usersService: UsersService, audit: AuditService);
    me(user: AuthUser): Promise<{
        status: import("../generated/prisma/enums").UserStatus;
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
    update(user: AuthUser, dto: UpdateUserDto, req: Request): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        avatarUrl: string | null;
        currency: string;
        timezone: string;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAccount(user: AuthUser, req: Request): Promise<void>;
}
