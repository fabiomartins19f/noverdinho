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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const accounts_service_1 = require("../accounts/accounts.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let TransactionsService = class TransactionsService {
    prisma;
    accounts;
    constructor(prisma, accounts) {
        this.prisma = prisma;
        this.accounts = accounts;
    }
    async create(input) {
        const { userId, idempotencyKey } = input;
        if (idempotencyKey) {
            const existing = await this.prisma.transaction.findUnique({
                where: { idempotencyKey },
            });
            if (existing && existing.userId === userId) {
                return { transaction: existing, duplicated: true };
            }
            if (existing) {
                throw new app_exception_1.AppException('DUPLICATE_IDEMPOTENCY_KEY', 'Chave de idempotência já utilizada por outro usuário.');
            }
        }
        const account = await this.accounts.getOwned(userId, input.accountId);
        if (input.type === 'TRANSFER') {
            if (!input.transferAccountId) {
                throw new app_exception_1.AppException('UNPROCESSABLE', 'Transferência requer conta de destino.');
            }
            if (input.transferAccountId === account.id) {
                throw new app_exception_1.AppException('UNPROCESSABLE', 'A conta de destino deve ser diferente da origem.');
            }
            await this.accounts.getOwned(userId, input.transferAccountId);
        }
        const amount = (0, money_1.money)(input.amount).abs();
        if (amount.isZero()) {
            throw new app_exception_1.AppException('INVALID_AMOUNT', 'O valor da movimentação deve ser maior que zero.');
        }
        const isAdjustment = input.type === 'ADJUSTMENT';
        const signedAmount = isAdjustment ? (0, money_1.money)(input.amount) : amount;
        try {
            const transaction = await this.prisma.$transaction(async (tx) => {
                const created = await tx.transaction.create({
                    data: {
                        userId,
                        accountId: account.id,
                        transferAccountId: input.type === 'TRANSFER' ? input.transferAccountId : null,
                        categoryId: input.categoryId,
                        type: input.type,
                        amount: signedAmount,
                        description: input.description,
                        transactionDate: input.transactionDate ?? new Date(),
                        recurring: input.recurring ?? false,
                        recurrenceRule: input.recurrenceRule,
                        idempotencyKey: idempotencyKey ?? null,
                    },
                });
                await this.applyBalanceEffect(tx, account.id, input.type, signedAmount, input.transferAccountId);
                return created;
            });
            return { transaction, duplicated: false };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002' &&
                idempotencyKey) {
                const existing = await this.prisma.transaction.findUnique({ where: { idempotencyKey } });
                if (existing)
                    return { transaction: existing, duplicated: true };
            }
            throw error;
        }
    }
    async applyBalanceEffect(tx, accountId, type, amount, transferAccountId) {
        switch (type) {
            case 'INCOME':
                await this.accounts.applyBalanceDelta(tx, accountId, amount);
                break;
            case 'EXPENSE':
                await this.accounts.applyBalanceDelta(tx, accountId, amount.neg());
                break;
            case 'TRANSFER':
                await this.accounts.applyBalanceDelta(tx, accountId, amount.neg());
                if (transferAccountId) {
                    await this.accounts.applyBalanceDelta(tx, transferAccountId, amount);
                }
                break;
            case 'ADJUSTMENT':
                await this.accounts.applyBalanceDelta(tx, accountId, amount);
                break;
        }
    }
    async list(userId, filters) {
        const page = filters.page ?? 1;
        const perPage = Math.min(filters.perPage ?? 20, 100);
        const where = {
            userId,
            ...(filters.type ? { type: filters.type } : {}),
            ...(filters.accountId ? { accountId: filters.accountId } : {}),
            ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
            ...(filters.from || filters.to
                ? {
                    transactionDate: {
                        ...(filters.from ? { gte: new Date(filters.from) } : {}),
                        ...(filters.to ? { lte: new Date(filters.to) } : {}),
                    },
                }
                : {}),
            ...(filters.search
                ? { description: { contains: filters.search, mode: 'insensitive' } }
                : {}),
        };
        const [items, total] = await Promise.all([
            this.prisma.transaction.findMany({
                where,
                include: { account: true, category: true },
                orderBy: { transactionDate: 'desc' },
                skip: (page - 1) * perPage,
                take: perPage,
            }),
            this.prisma.transaction.count({ where }),
        ]);
        return {
            items,
            page,
            perPage,
            total,
            totalPages: Math.ceil(total / perPage),
        };
    }
    async getOwned(userId, id) {
        const transaction = await this.prisma.transaction.findFirst({
            where: { id, userId },
            include: { account: true, category: true },
        });
        if (!transaction)
            throw new app_exception_1.AppException('TRANSACTION_NOT_FOUND', 'Movimentação não encontrada.', 404);
        return transaction;
    }
    async update(userId, id, dto) {
        const existing = await this.getOwned(userId, id);
        return this.prisma.transaction.update({
            where: { id },
            data: {
                description: dto.description,
                categoryId: dto.categoryId,
                transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : undefined,
                status: dto.status,
            },
        });
    }
    async cancel(userId, id) {
        const existing = await this.getOwned(userId, id);
        if (existing.status === 'CANCELED')
            return existing;
        if (existing.type === 'TRANSFER' && !existing.transferAccountId) {
            throw new app_exception_1.AppException('UNPROCESSABLE', 'Transferência sem conta de destino não pode ser cancelada.');
        }
        const signedAmount = (0, money_1.money)(existing.amount);
        const reversal = signedAmount.neg();
        await this.prisma.$transaction(async (tx) => {
            await tx.transaction.update({ where: { id }, data: { status: 'CANCELED' } });
            switch (existing.type) {
                case 'INCOME':
                    await this.accounts.applyBalanceDelta(tx, existing.accountId, reversal);
                    break;
                case 'EXPENSE':
                    await this.accounts.applyBalanceDelta(tx, existing.accountId, signedAmount);
                    break;
                case 'TRANSFER':
                    await this.accounts.applyBalanceDelta(tx, existing.accountId, signedAmount);
                    if (existing.transferAccountId) {
                        await this.accounts.applyBalanceDelta(tx, existing.transferAccountId, reversal);
                    }
                    break;
                case 'ADJUSTMENT':
                    await this.accounts.applyBalanceDelta(tx, existing.accountId, reversal);
                    break;
            }
        });
        return this.getOwned(userId, id);
    }
    async totalsInRange(userId, from, to) {
        const rows = await this.prisma.transaction.groupBy({
            by: ['type'],
            where: {
                userId,
                status: 'CONFIRMED',
                transactionDate: { gte: from, lte: to },
            },
            _sum: { amount: true },
        });
        const income = rows.find((r) => r.type === 'INCOME')?._sum.amount ?? (0, money_1.money)(0);
        const expense = rows
            .filter((r) => r.type === 'EXPENSE')
            .reduce((acc, r) => acc.plus(r._sum.amount ?? 0), (0, money_1.money)(0));
        return {
            income: (0, money_1.roundMoney)(income),
            expense: (0, money_1.roundMoney)(expense),
            net: (0, money_1.roundMoney)(income.minus(expense)),
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        accounts_service_1.AccountsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map