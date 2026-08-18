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
exports.BudgetsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let BudgetsService = class BudgetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsert(userId, dto) {
        const existing = await this.prisma.budget.findUnique({
            where: { userId_month_year: { userId, month: dto.month, year: dto.year } },
            include: { categories: true },
        });
        const result = await this.prisma.$transaction(async (tx) => {
            const budget = existing
                ? await tx.budget.update({
                    where: { id: existing.id },
                    data: { totalLimit: (0, money_1.money)(dto.totalLimit) },
                })
                : await tx.budget.create({
                    data: {
                        userId,
                        month: dto.month,
                        year: dto.year,
                        totalLimit: (0, money_1.money)(dto.totalLimit),
                    },
                });
            await tx.budgetCategory.deleteMany({ where: { budgetId: budget.id } });
            for (const cat of dto.categories) {
                await tx.budgetCategory.create({
                    data: { budgetId: budget.id, categoryId: cat.categoryId ?? null, name: cat.name, limit: (0, money_1.money)(cat.limit) },
                });
            }
            return budget;
        });
        return this.get(userId, dto.month, dto.year);
    }
    async get(userId, month, year) {
        const budget = await this.prisma.budget.findUnique({
            where: { userId_month_year: { userId, month, year } },
            include: { categories: true },
        });
        if (!budget)
            throw new app_exception_1.AppException('BUDGET_NOT_FOUND', 'Orçamento do mês não encontrado.', 404);
        const range = { start: (0, date_fns_1.startOfMonth)(new Date(year, month - 1, 1)), end: (0, date_fns_1.endOfMonth)(new Date(year, month - 1, 1)) };
        const spendByCategory = await this.prisma.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId,
                type: client_1.TransactionType.EXPENSE,
                status: 'CONFIRMED',
                transactionDate: { gte: range.start, lte: range.end },
                categoryId: { not: null },
            },
            _sum: { amount: true },
        });
        const spendMap = new Map(spendByCategory.map((r) => [r.categoryId, r._sum.amount ?? (0, money_1.money)(0)]));
        const categories = budget.categories.map((cat) => {
            const spent = spendMap.get(cat.categoryId ?? '') ?? (0, money_1.money)(0);
            return {
                ...cat,
                spent: (0, money_1.roundMoney)(spent),
                usedPercent: cat.limit.isZero() ? 0 : Number(spent.div(cat.limit).mul(100).toDecimalPlaces(1)),
            };
        });
        const totalSpent = categories.reduce((acc, c) => acc.plus(c.spent), (0, money_1.money)(0));
        return {
            ...budget,
            totalSpent: (0, money_1.roundMoney)(totalSpent),
            usedPercent: budget.totalLimit.isZero() ? 0 : Number(totalSpent.div(budget.totalLimit).mul(100).toDecimalPlaces(1)),
            categories,
            alerts: this.buildAlerts(categories),
        };
    }
    buildAlerts(categories) {
        return categories
            .filter((c) => c.usedPercent >= 80)
            .map((c) => ({
            category: c.name,
            severity: c.usedPercent >= 100 ? 'OVER' : 'NEAR',
            message: c.usedPercent >= 100
                ? `Limite de ${c.name} ultrapassado.`
                : `Você já usou ${c.usedPercent}% do limite de ${c.name}.`,
        }));
    }
    async list(userId, year) {
        return this.prisma.budget.findMany({
            where: { userId, ...(year ? { year } : {}) },
            include: { categories: true },
            orderBy: [{ year: 'desc' }, { month: 'desc' }],
            take: 24,
        });
    }
    async delete(userId, month, year) {
        const budget = await this.prisma.budget.findUnique({
            where: { userId_month_year: { userId, month, year } },
        });
        if (!budget)
            throw new app_exception_1.AppException('BUDGET_NOT_FOUND', 'Orçamento do mês não encontrado.', 404);
        await this.prisma.budgetCategory.deleteMany({ where: { budgetId: budget.id } });
        await this.prisma.budget.delete({ where: { id: budget.id } });
        return { deleted: true };
    }
};
exports.BudgetsService = BudgetsService;
exports.BudgetsService = BudgetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetsService);
//# sourceMappingURL=budgets.service.js.map