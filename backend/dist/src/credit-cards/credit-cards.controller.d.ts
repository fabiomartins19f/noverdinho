import { CreditCardsService } from './credit-cards.service';
import { CreateCardDto, CreatePurchaseDto, InvoiceQueryDto, UpdateCardDto } from './dto/credit-cards.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
export declare class CreditCardsController {
    private readonly cards;
    private readonly audit;
    constructor(cards: CreditCardsService, audit: AuditService);
    list(user: AuthUser): Promise<{
        usedAmount: import("@prisma/client-runtime-utils").Decimal;
        availableAmount: import("@prisma/client-runtime-utils").Decimal;
        utilizationPercent: number | import("@prisma/client-runtime-utils").Decimal;
        id: string;
        limit: import("../generated/prisma/internal/prismaNamespace").Decimal;
    }[]>;
    create(user: AuthUser, dto: CreateCardDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        institution: string | null;
        isActive: boolean;
        limit: import("@prisma/client-runtime-utils").Decimal;
        closingDay: number;
        dueDay: number;
    }>;
    get(user: AuthUser, id: string): Promise<{
        usedAmount: import("@prisma/client-runtime-utils").Decimal;
        availableAmount: import("@prisma/client-runtime-utils").Decimal;
        utilizationPercent: number | import("@prisma/client-runtime-utils").Decimal;
        id: string;
        limit: import("../generated/prisma/internal/prismaNamespace").Decimal;
    }>;
    update(user: AuthUser, id: string, dto: UpdateCardDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        institution: string | null;
        isActive: boolean;
        limit: import("@prisma/client-runtime-utils").Decimal;
        closingDay: number;
        dueDay: number;
    }>;
    remove(user: AuthUser, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        institution: string | null;
        isActive: boolean;
        limit: import("@prisma/client-runtime-utils").Decimal;
        closingDay: number;
        dueDay: number;
    } | {
        deleted: boolean;
    }>;
    createPurchase(user: AuthUser, id: string, dto: CreatePurchaseDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        categoryId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        description: string;
        cardId: string;
        purchaseDate: Date;
        installmentCount: number;
    }>;
    purchases(user: AuthUser, id: string): Promise<({
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
        installments: {
            number: number;
            id: string;
            status: import("../generated/prisma/enums").InstallmentStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            cardId: string;
            dueDate: Date;
            paidAt: Date | null;
            purchaseId: string;
            invoiceId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        categoryId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        description: string;
        cardId: string;
        purchaseDate: Date;
        installmentCount: number;
    })[]>;
    invoices(user: AuthUser, id: string, query: InvoiceQueryDto): Promise<{
        id: string;
        status: import("../generated/prisma/enums").InvoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        cardId: string;
        referenceMonth: number;
        referenceYear: number;
        closingDate: Date;
        dueDate: Date;
        paidAt: Date | null;
    }[]>;
    currentInvoice(user: AuthUser, id: string): Promise<{
        id: string;
        status: import("../generated/prisma/enums").InvoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        cardId: string;
        referenceMonth: number;
        referenceYear: number;
        closingDate: Date;
        dueDate: Date;
        paidAt: Date | null;
    } | null>;
    invoiceDetail(user: AuthUser, invoiceId: string): Promise<{
        installments: ({
            purchase: {
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
                createdAt: Date;
                userId: string;
                categoryId: string | null;
                amount: import("@prisma/client-runtime-utils").Decimal;
                description: string;
                cardId: string;
                purchaseDate: Date;
                installmentCount: number;
            };
        } & {
            number: number;
            id: string;
            status: import("../generated/prisma/enums").InstallmentStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            cardId: string;
            dueDate: Date;
            paidAt: Date | null;
            purchaseId: string;
            invoiceId: string | null;
        })[];
    } & {
        id: string;
        status: import("../generated/prisma/enums").InvoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        cardId: string;
        referenceMonth: number;
        referenceYear: number;
        closingDate: Date;
        dueDate: Date;
        paidAt: Date | null;
    }>;
    payInvoice(user: AuthUser, invoiceId: string): Promise<{
        id: string;
        status: import("../generated/prisma/enums").InvoiceStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        cardId: string;
        referenceMonth: number;
        referenceYear: number;
        closingDate: Date;
        dueDate: Date;
        paidAt: Date | null;
    } | null>;
}
