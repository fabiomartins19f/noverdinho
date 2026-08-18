import { AccountType, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class AccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }[]>;
    getOwned(userId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }>;
    create(userId: string, dto: {
        name: string;
        type?: string;
        initialBalance?: number;
        institution?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }>;
    update(userId: string, id: string, dto: Prisma.AccountUpdateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }>;
    delete(userId: string, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    } | {
        deleted: boolean;
    }>;
    applyBalanceDelta(tx: Prisma.TransactionClient, accountId: string, delta: Prisma.Decimal): Prisma.Prisma__AccountClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: AccountType;
        initialBalance: import("@prisma/client-runtime-utils").Decimal;
        currentBalance: import("@prisma/client-runtime-utils").Decimal;
        institution: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
