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
exports.PayoffPlanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const payoff_plan_service_1 = require("./payoff-plan.service");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
class PlanInputDto {
    monthlyBudget;
    strategy;
}
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9_999_999),
    __metadata("design:type", Number)
], PlanInputDto.prototype, "monthlyBudget", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['AVALANCHE', 'SNOWBALL']),
    __metadata("design:type", String)
], PlanInputDto.prototype, "strategy", void 0);
let PayoffPlanController = class PayoffPlanController {
    payoff;
    constructor(payoff) {
        this.payoff = payoff;
    }
    preview(user, dto) {
        return this.payoff.preview(user.id, dto);
    }
    create(user, dto) {
        return this.payoff.createPlan(user.id, dto);
    }
    list(user) {
        return this.payoff.listPlans(user.id);
    }
    get(user, id) {
        return this.payoff.getPlan(user.id, id);
    }
};
exports.PayoffPlanController = PayoffPlanController;
__decorate([
    (0, common_1.Post)('preview'),
    (0, swagger_1.ApiOperation)({ summary: 'Comparar estratégias sem persistir (Avalanche vs Bola de neve)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PlanInputDto]),
    __metadata("design:returntype", void 0)
], PayoffPlanController.prototype, "preview", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar plano de quitação (ordem de pagamento + projeções)' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PlanInputDto]),
    __metadata("design:returntype", void 0)
], PayoffPlanController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Histórico de planos' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PayoffPlanController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhe do plano com timeline de quitação' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PayoffPlanController.prototype, "get", null);
exports.PayoffPlanController = PayoffPlanController = __decorate([
    (0, swagger_1.ApiTags)('debts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('debts/payoff-plan'),
    __metadata("design:paramtypes", [payoff_plan_service_1.PayoffPlanService])
], PayoffPlanController);
//# sourceMappingURL=payoff-plan.controller.js.map