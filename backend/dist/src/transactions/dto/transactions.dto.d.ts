export declare class CreateTransactionDto {
    accountId: string;
    transferAccountId?: string;
    categoryId?: string;
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'ADJUSTMENT';
    amount: number;
    description: string;
    transactionDate?: string;
    recurring?: boolean;
    recurrenceRule?: string;
}
export declare class UpdateTransactionDto {
    description?: string;
    categoryId?: string;
    transactionDate?: string;
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELED';
}
export declare class ListTransactionsQueryDto {
    type?: string;
    accountId?: string;
    categoryId?: string;
    from?: string;
    to?: string;
    search?: string;
    page?: number;
    perPage?: number;
}
