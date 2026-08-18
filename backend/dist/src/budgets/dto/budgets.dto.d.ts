export declare class BudgetCategoryInputDto {
    categoryId?: string;
    name: string;
    limit: number;
}
export declare class UpsertBudgetDto {
    month: number;
    year: number;
    totalLimit: number;
    categories: BudgetCategoryInputDto[];
}
