export declare class CreateCardDto {
    name: string;
    institution?: string;
    limit: number;
    closingDay: number;
    dueDay: number;
}
export declare class UpdateCardDto {
    name?: string;
    institution?: string;
    limit?: number;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
}
export declare class CreatePurchaseDto {
    description: string;
    amount: number;
    categoryId?: string;
    purchaseDate?: string;
    installments: number;
}
export declare class InvoiceQueryDto {
    year?: number;
    month?: number;
}
