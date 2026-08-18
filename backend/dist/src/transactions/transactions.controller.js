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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transactions_service_1 = require("./transactions.service");
const transactions_dto_1 = require("./dto/transactions.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const audit_service_1 = require("../audit/audit.service");
const client_1 = require("../generated/prisma/client");
let TransactionsController = class TransactionsController {
    transactions;
    audit;
    constructor(transactions, audit) {
        this.transactions = transactions;
        this.audit = audit;
    }
    list(user, query) {
        return this.transactions.list(user.id, query);
    }
    async create(user, dto, idempotencyKey) {
        const result = await this.transactions.create({
            userId: user.id,
            accountId: dto.accountId,
            transferAccountId: dto.transferAccountId,
            categoryId: dto.categoryId,
            type: dto.type,
            amount: dto.amount,
            description: dto.description,
            transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : undefined,
            recurring: dto.recurring,
            recurrenceRule: dto.recurrenceRule,
            idempotencyKey,
        });
        if (!result.duplicated) {
            await this.audit.log(client_1.AuditAction.CREATE, {
                userId: user.id,
                entity: 'Transaction',
                entityId: result.transaction.id,
                metadata: { type: dto.type, amount: dto.amount },
            });
        }
        return result;
    }
    get(user, id) {
        return this.transactions.getOwned(user.id, id);
    }
    async update(user, id, dto) {
        const updated = await this.transactions.update(user.id, id, dto);
        await this.audit.log(client_1.AuditAction.UPDATE, { userId: user.id, entity: 'Transaction', entityId: id });
        return updated;
    }
    async remove(user, id) {
        const canceled = await this.transactions.cancel(user.id, id);
        await this.audit.log(client_1.AuditAction.DELETE, { userId: user.id, entity: 'Transaction', entityId: id });
        return canceled;
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar movimentações (filtros por tipo, período, conta, categoria)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transactions_dto_1.ListTransactionsQueryDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar movimentação. Suporta header Idempotency-Key para evitar duplicação.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('idempotency-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transactions_dto_1.CreateTransactionDto, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhe da movimentação' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar descrição, categoria, data ou status' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, transactions_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar movimentação (reverte saldo, soft delete)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "remove", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService,
        audit_service_1.AuditService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map