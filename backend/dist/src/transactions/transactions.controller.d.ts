import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, ListTransactionsQueryDto, UpdateTransactionDto } from './dto/transactions.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
export declare class TransactionsController {
    private readonly transactions;
    private readonly audit;
    constructor(transactions: TransactionsService, audit: AuditService);
    list(user: AuthUser, query: ListTransactionsQueryDto): Promise<{
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
            status: import("../generated/prisma/enums").TransactionStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: import("../generated/prisma/enums").TransactionType;
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
    create(user: AuthUser, dto: CreateTransactionDto, idempotencyKey?: string): Promise<{
        transaction: {
            id: string;
            status: import("../generated/prisma/enums").TransactionStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: import("../generated/prisma/enums").TransactionType;
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
    get(user: AuthUser, id: string): Promise<{
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
        status: import("../generated/prisma/enums").TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").TransactionType;
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
    update(user: AuthUser, id: string, dto: UpdateTransactionDto): Promise<{
        id: string;
        status: import("../generated/prisma/enums").TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").TransactionType;
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
    remove(user: AuthUser, id: string): Promise<{
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
        status: import("../generated/prisma/enums").TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").TransactionType;
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
}
