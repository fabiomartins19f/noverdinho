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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const credit_cards_service_1 = require("./credit-cards.service");
const credit_cards_dto_1 = require("./dto/credit-cards.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const audit_service_1 = require("../audit/audit.service");
const client_1 = require("../generated/prisma/client");
let CreditCardsController = class CreditCardsController {
    cards;
    audit;
    constructor(cards, audit) {
        this.cards = cards;
        this.audit = audit;
    }
    list(user) {
        return this.cards.list(user.id);
    }
    async create(user, dto) {
        const card = await this.cards.create(user.id, dto);
        await this.audit.log(client_1.AuditAction.CREATE, { userId: user.id, entity: 'CreditCard', entityId: card.id });
        return card;
    }
    async get(user, id) {
        const card = await this.cards.getOwned(user.id, id);
        return this.cards.withUtilization(user.id, card);
    }
    async update(user, id, dto) {
        const card = await this.cards.update(user.id, id, dto);
        await this.audit.log(client_1.AuditAction.UPDATE, { userId: user.id, entity: 'CreditCard', entityId: id });
        return card;
    }
    async remove(user, id) {
        const result = await this.cards.remove(user.id, id);
        await this.audit.log(client_1.AuditAction.DELETE, { userId: user.id, entity: 'CreditCard', entityId: id });
        return result;
    }
    async createPurchase(user, id, dto) {
        const purchase = await this.cards.createPurchase(user.id, id, dto);
        await this.audit.log(client_1.AuditAction.CREATE, { userId: user.id, entity: 'CreditCardPurchase', entityId: purchase.id });
        return purchase;
    }
    purchases(user, id) {
        return this.cards.listPurchases(user.id, id);
    }
    invoices(user, id, query) {
        return this.cards.listInvoices(user.id, id, 12);
    }
    currentInvoice(user, id) {
        return this.cards.currentInvoice(user.id, id);
    }
    invoiceDetail(user, invoiceId) {
        return this.cards.invoiceDetail(user.id, invoiceId);
    }
    async payInvoice(user, invoiceId) {
        const invoice = await this.cards.payInvoice(user.id, invoiceId);
        await this.audit.log(client_1.AuditAction.PAYMENT, { userId: user.id, entity: 'CreditCardInvoice', entityId: invoiceId });
        return invoice;
    }
};
exports.CreditCardsController = CreditCardsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar cartões com utilização do limite' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CreditCardsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar cartão' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, credit_cards_dto_1.CreateCardDto]),
    __metadata("design:returntype", Promise)
], CreditCardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhe do cartão' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CreditCardsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar cartão' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, credit_cards_dto_1.UpdateCardDto]),
    __metadata("design:returntype", Promise)
], CreditCardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover cartão (soft delete se houver parcelas pendentes)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CreditCardsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/purchases'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar compra (gera parcelas e distribui nas faturas)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, credit_cards_dto_1.CreatePurchaseDto]),
    __metadata("design:returntype", Promise)
], CreditCardsController.prototype, "createPurchase", null);
__decorate([
    (0, common_1.Get)(':id/purchases'),
    (0, swagger_1.ApiOperation)({ summary: 'Compras do cartão com parcelas' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CreditCardsController.prototype, "purchases", null);
__decorate([
    (0, common_1.Get)(':id/invoices'),
    (0, swagger_1.ApiOperation)({ summary: 'Faturas do cartão (atual + histórico)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, credit_cards_dto_1.InvoiceQueryDto]),
    __metadata("design:returntype", void 0)
], CreditCardsController.prototype, "invoices", null);
__decorate([
    (0, common_1.Get)(':id/invoices/current'),
    (0, swagger_1.ApiOperation)({ summary: 'Fatura atual (próxima a vencer)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CreditCardsController.prototype, "currentInvoice", null);
__decorate([
    (0, common_1.Get)('invoices/:invoiceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhe de uma fatura' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('invoiceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CreditCardsController.prototype, "invoiceDetail", null);
__decorate([
    (0, common_1.Post)('invoices/:invoiceId/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'Marcar fatura como paga (baixa parcelas da fatura)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('invoiceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CreditCardsController.prototype, "payInvoice", null);
exports.CreditCardsController = CreditCardsController = __decorate([
    (0, swagger_1.ApiTags)('credit-cards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cards'),
    __metadata("design:paramtypes", [credit_cards_service_1.CreditCardsService,
        audit_service_1.AuditService])
], CreditCardsController);
//# sourceMappingURL=credit-cards.controller.js.map