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
exports.DebtsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const debts_service_1 = require("./debts.service");
const debts_dto_1 = require("./dto/debts.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const audit_service_1 = require("../audit/audit.service");
const client_1 = require("../generated/prisma/client");
let DebtsController = class DebtsController {
    debts;
    audit;
    constructor(debts, audit) {
        this.debts = debts;
        this.audit = audit;
    }
    list(user, query) {
        return this.debts.list(user.id, query);
    }
    overview(user) {
        return this.debts.overview(user.id);
    }
    async create(user, dto) {
        const debt = await this.debts.create(user.id, dto);
        await this.audit.log(client_1.AuditAction.CREATE, {
            userId: user.id,
            entity: 'Debt',
            entityId: debt.id,
            metadata: { creditor: dto.creditor, amount: dto.originalAmount },
        });
        return debt;
    }
    detail(user, id) {
        return this.debts.detail(user.id, id);
    }
    async update(user, id, dto) {
        const debt = await this.debts.update(user.id, id, dto);
        await this.audit.log(client_1.AuditAction.UPDATE, { userId: user.id, entity: 'Debt', entityId: id });
        return debt;
    }
    async remove(user, id) {
        const result = await this.debts.remove(user.id, id);
        await this.audit.log(client_1.AuditAction.DELETE, { userId: user.id, entity: 'Debt', entityId: id });
        return result;
    }
    async pay(user, id, dto) {
        const result = await this.debts.registerPayment(user.id, id, dto);
        await this.audit.log(client_1.AuditAction.PAYMENT, {
            userId: user.id,
            entity: 'Debt',
            entityId: id,
            metadata: { amount: dto.amount },
        });
        return result;
    }
};
exports.DebtsController = DebtsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar dívidas (filtros: status, tipo, prioridade)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, debts_dto_1.ListDebtsQueryDto]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Resumo de dívidas (total, quitado, contagem por status)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "overview", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar dívida (gera cronograma de parcelas quando aplicável)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, debts_dto_1.CreateDebtDto]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhe da dívida (parcelas + pagamentos + progresso)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], DebtsController.prototype, "detail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar dívida' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, debts_dto_1.UpdateDebtDto]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancelar/remover dívida (soft delete quando há histórico)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar pagamento (aloca em parcelas: multa → juros → principal)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, debts_dto_1.RegisterDebtPaymentDto]),
    __metadata("design:returntype", Promise)
], DebtsController.prototype, "pay", null);
exports.DebtsController = DebtsController = __decorate([
    (0, swagger_1.ApiTags)('debts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('debts'),
    __metadata("design:paramtypes", [debts_service_1.DebtsService,
        audit_service_1.AuditService])
], DebtsController);
//# sourceMappingURL=debts.controller.js.map