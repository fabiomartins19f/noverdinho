"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(userId) {
        return this.prisma.category.findMany({
            where: { archived: false, OR: [{ userId: null }, { userId }] },
            orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
        });
    }
    async create(userId, dto) {
        return this.prisma.category.create({
            data: { userId, name: dto.name, kind: dto.kind ?? 'EXPENSE', icon: dto.icon, color: dto.color },
        });
    }
    async getOwned(userId, id) {
        const category = await this.prisma.category.findFirst({ where: { id, userId } });
        if (!category)
            throw new app_exception_1.AppException('CATEGORY_NOT_FOUND', 'Categoria não encontrada.', 404);
        return category;
    }
    async update(userId, id, dto) {
        await this.getOwned(userId, id);
        return this.prisma.category.update({ where: { id }, data: dto });
    }
    async delete(userId, id) {
        await this.getOwned(userId, id);
        const usage = await this.prisma.transaction.count({ where: { categoryId: id } });
        if (usage > 0) {
            await this.prisma.category.update({ where: { id }, data: { archived: true } });
            return { archived: true, message: 'Categoria arquivada por possuir movimentações.' };
        }
        await this.prisma.category.delete({ where: { id } });
        return { deleted: true };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map