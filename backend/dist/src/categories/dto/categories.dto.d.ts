import { CategoryKind } from '../../generated/prisma/client';
export declare class CreateCategoryDto {
    name: string;
    kind?: CategoryKind;
    icon?: string;
    color?: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    icon?: string;
    color?: string;
    archived?: string;
}
