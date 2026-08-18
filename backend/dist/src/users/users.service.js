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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email.toLowerCase(),
                phone: data.phone,
                passwordHash: data.passwordHash,
            },
        });
    }
    async update(id, data) {
        const existing = await this.findById(id);
        if (!existing)
            throw new app_exception_1.AppException('USER_NOT_FOUND', 'Usuário não encontrado.', 404);
        return this.prisma.user.update({ where: { id }, data });
    }
    async updatePassword(id, passwordHash) {
        return this.prisma.user.update({ where: { id }, data: { passwordHash } });
    }
    async revokeAllSessions(userId) {
        await this.prisma.session.updateMany({
            where: { userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    async deleteUser(id) {
        await this.prisma.user.delete({ where: { id } });
    }
    async getSummary(id) {
        const [user, accounts, debts, cards] = await Promise.all([
            this.findById(id),
            this.prisma.account.aggregate({
                where: { userId: id, isActive: true },
                _sum: { currentBalance: true },
            }),
            this.prisma.debt.aggregate({
                where: { userId: id, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } },
                _sum: { currentBalance: true },
            }),
            this.prisma.creditCard.count({ where: { userId: id, isActive: true } }),
        ]);
        if (!user)
            throw new app_exception_1.AppException('USER_NOT_FOUND', 'Usuário não encontrado.', 404);
        return {
            ...user,
            status: user.status,
            summary: {
                balance: (0, money_1.roundMoney)(accounts._sum.currentBalance ?? 0),
                totalDebt: (0, money_1.roundMoney)(debts._sum.currentBalance ?? 0),
                activeCards: cards,
            },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map