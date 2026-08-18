import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
export declare class CategoriesController {
    private readonly categories;
    private readonly audit;
    constructor(categories: CategoriesService, audit: AuditService);
    list(user: AuthUser): Promise<{
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
    }[]>;
    create(user: AuthUser, dto: CreateCategoryDto): Promise<{
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
    }>;
    update(user: AuthUser, id: string, dto: UpdateCategoryDto): Promise<{
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
    }>;
    remove(user: AuthUser, id: string): Promise<{
        archived: boolean;
        message: string;
        deleted?: undefined;
    } | {
        deleted: boolean;
        archived?: undefined;
        message?: undefined;
    }>;
}
