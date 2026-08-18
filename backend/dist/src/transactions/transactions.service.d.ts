import { TransactionStatus, TransactionType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';
export interface CreateTransactionInput {
    userId: string;
    accountId: string;
    transferAccountId?: string;
    categoryId?: string;
    type: TransactionType;
    amount: number;
    description: string;
    transactionDate?: Date;
    recurring?: boolean;
    recurrenceRule?: string;
    idempotencyKey?: string;
}
export declare class TransactionsService {
    private readonly prisma;
    private readonly accounts;
    constructor(prisma: PrismaService, accounts: AccountsService);
    create(input: CreateTransactionInput): Promise<{
        transaction: {
            id: string;
            status: TransactionStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: TransactionType;
            accountId: string;
            transferAccountId: string | null;
            categoryId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            description: string;
            transactionDate: Date;
            recurring: boolean;
            recurrenceRule: string | null;
            idempotencyKey: string | null;
        };
        duplicated: boolean;
    }>;
    private applyBalanceEffect;
    list(userId: string, filters: {
        type?: string;
        accountId?: string;
        categoryId?: string;
        from?: string;
        to?: string;
        search?: string;
        page?: number;
        perPage?: number;
    }): Promise<{
        items: ({
            account: {
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
            };
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string | null;
                icon: string | null;
                color: string | null;
                kind: import("../generated/prisma/enums").CategoryKind;
                isDefault: boolean;
                archived: boolean;
            } | null;
        } & {
            id: string;
            status: TransactionStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: TransactionType;
            accountId: string;
            transferAccountId: string | null;
            categoryId: string | null;
            amount: import("@prisma/client-runtime-utils").Decimal;
            description: string;
            transactionDate: Date;
            recurring: boolean;
            recurrenceRule: string | null;
            idempotencyKey: string | null;
        })[];
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
    }>;
    getOwned(userId: string, id: string): Promise<{
        account: {
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
        };
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            icon: string | null;
            color: string | null;
            kind: import("../generated/prisma/enums").CategoryKind;
            isDefault: boolean;
            archived: boolean;
        } | null;
    } & {
        id: string;
        status: TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: TransactionType;
        accountId: string;
        transferAccountId: string | null;
        categoryId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        description: string;
        transactionDate: Date;
        recurring: boolean;
        recurrenceRule: string | null;
        idempotencyKey: string | null;
    }>;
    update(userId: string, id: string, dto: {
        description?: string;
        categoryId?: string;
        transactionDate?: string;
        status?: string;
    }): Promise<{
        id: string;
        status: TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: TransactionType;
        accountId: string;
        transferAccountId: string | null;
        categoryId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        description: string;
        transactionDate: Date;
        recurring: boolean;
        recurrenceRule: string | null;
        idempotencyKey: string | null;
    }>;
    cancel(userId: string, id: string): Promise<{
        account: {
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
        };
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            icon: string | null;
            color: string | null;
            kind: import("../generated/prisma/enums").CategoryKind;
            isDefault: boolean;
            archived: boolean;
        } | null;
    } & {
        id: string;
        status: TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: TransactionType;
        accountId: string;
        transferAccountId: string | null;
        categoryId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        description: string;
        transactionDate: Date;
        recurring: boolean;
        recurrenceRule: string | null;
        idempotencyKey: string | null;
    }>;
    totalsInRange(userId: string, from: Date, to: Date): Promise<{
        income: import("@prisma/client-runtime-utils").Decimal;
        expense: import("@prisma/client-runtime-utils").Decimal;
        net: import("@prisma/client-runtime-utils").Decimal;
    }>;
}
