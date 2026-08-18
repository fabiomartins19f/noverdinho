export declare class PaginationQueryDto {
    page: number;
    perPage: number;
}
export interface PaginatedResult<T> {
    items: T[];
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}
