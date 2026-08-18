import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string): Promise<{
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
    create(userId: string, dto: {
        name: string;
        kind?: string;
        icon?: string;
        color?: string;
    }): Promise<{
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
    getOwned(userId: string, id: string): Promise<{
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
    update(userId: string, id: string, dto: {
        name?: string;
        icon?: string;
        color?: string;
    }): Promise<{
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
    delete(userId: string, id: string): Promise<{
        archived: boolean;
        message: string;
        deleted?: undefined;
    } | {
        deleted: boolean;
        archived?: undefined;
        message?: undefined;
    }>;
}
