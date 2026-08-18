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
exports.CreditCardsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let CreditCardsService = class CreditCardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(userId) {
        const cards = await this.prisma.creditCard.findMany({
            where: { userId, isActive: true },
            orderBy: { createdAt: 'asc' },
        });
        return Promise.all(cards.map((card) => this.withUtilization(userId, card)));
    }
    async getOwned(userId, id) {
        const card = await this.prisma.creditCard.findFirst({ where: { id, userId } });
        if (!card)
            throw new app_exception_1.AppException('CARD_NOT_FOUND', 'Cartão não encontrado.', 404);
        return card;
    }
    async create(userId, dto) {
        return this.prisma.creditCard.create({
            data: { userId, ...dto, limit: (0, money_1.money)(dto.limit) },
        });
    }
    async update(userId, id, dto) {
        await this.getOwned(userId, id);
        return this.prisma.creditCard.update({ where: { id }, data: dto });
    }
    async remove(userId, id) {
        await this.getOwned(userId, id);
        const usage = await this.prisma.creditCardInstallment.count({
            where: { cardId: id, status: { in: ['PENDING', 'OVERDUE'] } },
        });
        if (usage > 0) {
            return this.prisma.creditCard.update({ where: { id }, data: { isActive: false } });
        }
        await this.prisma.creditCard.delete({ where: { id } });
        return { deleted: true };
    }
    async withUtilization(userId, card) {
        const committed = await this.prisma.creditCardInstallment.aggregate({
            where: { cardId: card.id, userId, status: { in: ['PENDING', 'OVERDUE'] } },
            _sum: { amount: true },
        });
        const used = committed._sum.amount ?? (0, money_1.money)(0);
        const limit = (0, money_1.money)(card.limit);
        const available = limit.minus(used).lt(0) ? (0, money_1.money)(0) : limit.minus(used);
        return {
            ...card,
            usedAmount: (0, money_1.roundMoney)(used),
            availableAmount: (0, money_1.roundMoney)(available),
            utilizationPercent: limit.isZero() ? 0 : (0, money_1.roundMoney)(used.div(limit).mul(100)),
        };
    }
    async getOrCreateInvoice(userId, cardId, year, month) {
        const card = await this.getOwned(userId, cardId);
        const existing = await this.prisma.creditCardInvoice.findUnique({
            where: { cardId_referenceMonth_referenceYear: { cardId, referenceMonth: month, referenceYear: year } },
        });
        if (existing)
            return existing;
        const closingDate = new Date(year, month - 1, card.closingDay);
        const dueDate = new Date(year, month - 1, card.dueDay);
        if (dueDate < closingDate)
            dueDate.setMonth(dueDate.getMonth() + 1);
        return this.prisma.creditCardInvoice.create({
            data: {
                cardId,
                userId,
                referenceMonth: month,
                referenceYear: year,
                closingDate,
                dueDate,
            },
        });
    }
    async syncInvoiceAmount(invoiceId) {
        const total = await this.prisma.creditCardInstallment.aggregate({
            where: { invoiceId, status: { in: ['PENDING', 'OVERDUE'] } },
            _sum: { amount: true },
        });
        return this.prisma.creditCardInvoice.update({
            where: { id: invoiceId },
            data: { amount: total._sum.amount ?? (0, money_1.money)(0) },
        });
    }
    async listInvoices(userId, cardId, limit = 12) {
        await this.getOwned(userId, cardId);
        return this.prisma.creditCardInvoice.findMany({
            where: { cardId, userId },
            orderBy: [{ referenceYear: 'desc' }, { referenceMonth: 'desc' }],
            take: limit,
        });
    }
    async currentInvoice(userId, cardId) {
        await this.getOwned(userId, cardId);
        const now = new Date();
        const current = await this.prisma.creditCardInvoice.findFirst({
            where: { cardId, userId, status: 'OPEN', dueDate: { gte: now } },
            orderBy: { dueDate: 'asc' },
        });
        return current ?? null;
    }
    async payInvoice(userId, invoiceId) {
        const invoice = await this.prisma.creditCardInvoice.findFirst({
            where: { id: invoiceId, userId },
        });
        if (!invoice)
            throw new app_exception_1.AppException('INVOICE_NOT_FOUND', 'Fatura não encontrada.', 404);
        await this.prisma.$transaction([
            this.prisma.creditCardInvoice.update({
                where: { id: invoiceId },
                data: { status: 'PAID', paidAt: new Date() },
            }),
            this.prisma.creditCardInstallment.updateMany({
                where: { invoiceId, status: { in: ['PENDING', 'OVERDUE'] } },
                data: { status: 'PAID', paidAt: new Date() },
            }),
        ]);
        return this.prisma.creditCardInvoice.findUnique({ where: { id: invoiceId } });
    }
    async createPurchase(userId, cardId, dto) {
        const card = await this.getOwned(userId, cardId);
        const total = (0, money_1.money)(dto.amount);
        const count = dto.installments;
        const baseInstallment = total.div(count);
        const purchaseDate = dto.purchaseDate ? new Date(dto.purchaseDate) : new Date();
        const firstDue = new Date(purchaseDate.getFullYear(), purchaseDate.getMonth(), card.dueDay);
        if (firstDue <= purchaseDate)
            firstDue.setMonth(firstDue.getMonth() + 1);
        return this.prisma.$transaction(async (tx) => {
            const purchase = await tx.creditCardPurchase.create({
                data: {
                    cardId,
                    userId,
                    categoryId: dto.categoryId,
                    description: dto.description,
                    amount: total,
                    purchaseDate,
                    installmentCount: count,
                },
            });
            const remainder = total.minus(baseInstallment.times(count));
            const installments = [];
            for (let i = 0; i < count; i++) {
                const amount = i === count - 1 ? baseInstallment.plus(remainder) : baseInstallment;
                const due = (0, date_fns_1.addMonths)(firstDue, i);
                const invoice = await tx.creditCardInvoice.findUnique({
                    where: {
                        cardId_referenceMonth_referenceYear: {
                            cardId,
                            referenceMonth: due.getMonth() + 1,
                            referenceYear: due.getFullYear(),
                        },
                    },
                });
                const invoiceId = invoice?.id ?? (await tx.creditCardInvoice.create({
                    data: {
                        cardId,
                        userId,
                        referenceMonth: due.getMonth() + 1,
                        referenceYear: due.getFullYear(),
                        closingDate: new Date(due.getFullYear(), due.getMonth(), card.closingDay),
                        dueDate: due,
                    },
                })).id;
                installments.push(await tx.creditCardInstallment.create({
                    data: {
                        purchaseId: purchase.id,
                        cardId,
                        userId,
                        invoiceId,
                        number: i + 1,
                        amount: (0, money_1.roundMoney)(amount),
                        dueDate: due,
                    },
                }));
            }
            const invoiceIds = [...new Set(installments.map((i) => i.invoiceId).filter((id) => Boolean(id)))];
            for (const invoiceId of invoiceIds) {
                const sum = await tx.creditCardInstallment.aggregate({
                    where: { invoiceId, status: { in: ['PENDING', 'OVERDUE'] } },
                    _sum: { amount: true },
                });
                await tx.creditCardInvoice.update({
                    where: { id: invoiceId },
                    data: { amount: sum._sum.amount ?? (0, money_1.money)(0) },
                });
            }
            return purchase;
        });
    }
    async listPurchases(userId, cardId) {
        await this.getOwned(userId, cardId);
        return this.prisma.creditCardPurchase.findMany({
            where: { cardId, userId },
            include: { installments: { orderBy: { number: 'asc' } }, category: true },
            orderBy: { purchaseDate: 'desc' },
        });
    }
    async listInstallments(userId, cardId, status) {
        await this.getOwned(userId, cardId);
        return this.prisma.creditCardInstallment.findMany({
            where: { cardId, userId, ...(status ? { status } : {}) },
            orderBy: { dueDate: 'asc' },
        });
    }
    async upcomingCommitments(userId, from, to) {
        return this.prisma.creditCardInstallment.findMany({
            where: { userId, status: { in: ['PENDING', 'OVERDUE'] }, dueDate: { gte: from, lte: to } },
            include: { card: true, invoice: true },
            orderBy: { dueDate: 'asc' },
        });
    }
    async invoiceDetail(userId, invoiceId) {
        const invoice = await this.prisma.creditCardInvoice.findFirst({
            where: { id: invoiceId, userId },
            include: {
                installments: {
                    include: { purchase: { include: { category: true } } },
                    orderBy: { number: 'asc' },
                },
            },
        });
        if (!invoice)
            throw new app_exception_1.AppException('INVOICE_NOT_FOUND', 'Fatura não encontrada.', 404);
        return invoice;
    }
};
exports.CreditCardsService = CreditCardsService;
exports.CreditCardsService = CreditCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CreditCardsService);
//# sourceMappingURL=credit-cards.service.js.map