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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let AccountsService = class AccountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(userId) {
        return this.prisma.account.findMany({
            where: { userId },
            orderBy: [{ isActive: 'desc' }, { createdAt: 'asc' }],
        });
    }
    async getOwned(userId, id) {
        const account = await this.prisma.account.findFirst({ where: { id, userId } });
        if (!account)
            throw new app_exception_1.AppException('ACCOUNT_NOT_FOUND', 'Conta não encontrada.', 404);
        return account;
    }
    async create(userId, dto) {
        const initial = (0, money_1.money)(dto.initialBalance ?? 0);
        return this.prisma.account.create({
            data: {
                userId,
                name: dto.name,
                type: dto.type ?? 'CHECKING',
                initialBalance: initial,
                currentBalance: initial,
                institution: dto.institution,
            },
        });
    }
    async update(userId, id, dto) {
        await this.getOwned(userId, id);
        return this.prisma.account.update({ where: { id }, data: dto });
    }
    async delete(userId, id) {
        await this.getOwned(userId, id);
        const txCount = await this.prisma.transaction.count({ where: { accountId: id } });
        if (txCount > 0) {
            return this.prisma.account.update({ where: { id }, data: { isActive: false } });
        }
        await this.prisma.account.delete({ where: { id } });
        return { deleted: true };
    }
    applyBalanceDelta(tx, accountId, delta) {
        return tx.account.update({
            where: { id: accountId },
            data: { currentBalance: { increment: delta } },
        });
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map