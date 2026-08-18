import { InstallmentStatus, InvoiceStatus, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class CreditCardsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string): Promise<{
        usedAmount: import("@prisma/client-runtime-utils").Decimal;
        availableAmount: import("@prisma/client-runtime-utils").Decimal;
        utilizationPercent: number | import("@prisma/client-runtime-utils").Decimal;
        id: string;
        limit: Prisma.Decimal;
    }[]>;
    getOwned(userId: string, id: string): Promise<{
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
    create(userId: string, dto: {
        name: string;
        institution?: string;
        limit: number;
        closingDay: number;
        dueDay: number;
    }): Promise<{
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
    update(userId: string, id: string, dto: Prisma.CreditCardUpdateInput): Promise<{
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
    remove(userId: string, id: string): Promise<{
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
    withUtilization(userId: string, card: {
        id: string;
        limit: Prisma.Decimal;
    }): Promise<{
        usedAmount: import("@prisma/client-runtime-utils").Decimal;
        availableAmount: import("@prisma/client-runtime-utils").Decimal;
        utilizationPercent: number | import("@prisma/client-runtime-utils").Decimal;
        id: string;
        limit: Prisma.Decimal;
    }>;
    getOrCreateInvoice(userId: string, cardId: string, year: number, month: number): Promise<{
        id: string;
        status: InvoiceStatus;
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
    syncInvoiceAmount(invoiceId: string): Promise<{
        id: string;
        status: InvoiceStatus;
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
    listInvoices(userId: string, cardId: string, limit?: number): Promise<{
        id: string;
        status: InvoiceStatus;
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
    currentInvoice(userId: string, cardId: string): Promise<{
        id: string;
        status: InvoiceStatus;
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
    payInvoice(userId: string, invoiceId: string): Promise<{
        id: string;
        status: InvoiceStatus;
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
    createPurchase(userId: string, cardId: string, dto: {
        description: string;
        amount: number;
        categoryId?: string;
        purchaseDate?: string;
        installments: number;
    }): Promise<{
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
    listPurchases(userId: string, cardId: string): Promise<({
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
            status: InstallmentStatus;
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
    listInstallments(userId: string, cardId: string, status?: InstallmentStatus): Promise<{
        number: number;
        id: string;
        status: InstallmentStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        cardId: string;
        dueDate: Date;
        paidAt: Date | null;
        purchaseId: string;
        invoiceId: string | null;
    }[]>;
    upcomingCommitments(userId: string, from: Date, to: Date): Promise<({
        card: {
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
        };
        invoice: {
            id: string;
            status: InvoiceStatus;
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
        } | null;
    } & {
        number: number;
        id: string;
        status: InstallmentStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        cardId: string;
        dueDate: Date;
        paidAt: Date | null;
        purchaseId: string;
        invoiceId: string | null;
    })[]>;
    invoiceDetail(userId: string, invoiceId: string): Promise<{
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
            status: InstallmentStatus;
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
        status: InvoiceStatus;
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
}
