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
exports.BudgetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const budgets_service_1 = require("./budgets.service");
const budgets_dto_1 = require("./dto/budgets.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const audit_service_1 = require("../audit/audit.service");
const client_1 = require("../generated/prisma/client");
class BudgetQueryDto {
    year;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2020),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], BudgetQueryDto.prototype, "year", void 0);
let BudgetsController = class BudgetsController {
    budgets;
    audit;
    constructor(budgets, audit) {
        this.budgets = budgets;
        this.audit = audit;
    }
    list(user, query) {
        return this.budgets.list(user.id, query.year);
    }
    get(user, year, month) {
        return this.budgets.get(user.id, month, year);
    }
    async upsert(user, dto) {
        const budget = await this.budgets.upsert(user.id, dto);
        await this.audit.log(client_1.AuditAction.UPDATE, {
            userId: user.id,
            entity: 'Budget',
            entityId: budget.id,
            metadata: { month: dto.month, year: dto.year },
        });
        return budget;
    }
    async remove(user, year, month) {
        const result = await this.budgets.delete(user.id, month, year);
        await this.audit.log(client_1.AuditAction.DELETE, { userId: user.id, entity: 'Budget' });
        return result;
    }
};
exports.BudgetsController = BudgetsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar orçamentos' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BudgetQueryDto]),
    __metadata("design:returntype", void 0)
], BudgetsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':year/:month'),
    (0, swagger_1.ApiOperation)({ summary: 'Orçamento do mês com consumo real por categoria' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('year')),
    __param(2, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], BudgetsController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar ou atualizar orçamento do mês' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, budgets_dto_1.UpsertBudgetDto]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "upsert", null);
__decorate([
    (0, common_1.Delete)(':year/:month'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover orçamento do mês' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('year')),
    __param(2, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "remove", null);
exports.BudgetsController = BudgetsController = __decorate([
    (0, swagger_1.ApiTags)('budgets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('budgets'),
    __metadata("design:paramtypes", [budgets_service_1.BudgetsService,
        audit_service_1.AuditService])
], BudgetsController);
//# sourceMappingURL=budgets.controller.js.map