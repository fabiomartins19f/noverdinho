import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/accounts.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
export declare class AccountsController {
    private readonly accounts;
    private readonly audit;
    constructor(accounts: AccountsService, audit: AuditService);
    list(user: AuthUser): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }[]>;
    create(user: AuthUser, dto: CreateAccountDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }>;
    get(user: AuthUser, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }>;
    update(user: AuthUser, id: string, dto: UpdateAccountDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }>;
    remove(user: AuthUser, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    } | {
        deleted: boolean;
    }>;
}
