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
exports.FinancialAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const can_i_spend_service_1 = require("./can-i-spend.service");
const financial_capacity_service_1 = require("./financial-capacity.service");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
class CanISpendDto {
    amount;
}
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    (0, class_validator_1.Max)(9_999_999),
    __metadata("design:type", Number)
], CanISpendDto.prototype, "amount", void 0);
class CapacityInputDto {
    monthlyIncome;
    essentialExpenses;
    mandatoryCommitments;
    safetyMarginPercent;
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CapacityInputDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CapacityInputDto.prototype, "essentialExpenses", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CapacityInputDto.prototype, "mandatoryCommitments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CapacityInputDto.prototype, "safetyMarginPercent", void 0);
let FinancialAnalysisController = class FinancialAnalysisController {
    canISpend;
    capacity;
    constructor(canISpend, capacity) {
        this.canISpend = canISpend;
        this.capacity = capacity;
    }
    analyzeCanISpend(user, dto) {
        return this.canISpend.analyze(user.id, dto.amount);
    }
    computeCapacity(_user, dto) {
        return this.capacity.compute(dto);
    }
};
exports.FinancialAnalysisController = FinancialAnalysisController;
__decorate([
    (0, common_1.Post)('can-i-spend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Posso gastar?',
        description: 'Analisa saldo, compromissos próximos, dívidas, faturas e orçamento. Retorna SAFE | CAUTION | NOT_RECOMMENDED.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CanISpendDto]),
    __metadata("design:returntype", void 0)
], FinancialAnalysisController.prototype, "analyzeCanISpend", null);
__decorate([
    (0, common_1.Post)('capacity'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Capacidade de pagamento',
        description: 'Receitas - despesas essenciais - compromissos obrigatórios, com margem de segurança.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CapacityInputDto]),
    __metadata("design:returntype", void 0)
], FinancialAnalysisController.prototype, "computeCapacity", null);
exports.FinancialAnalysisController = FinancialAnalysisController = __decorate([
    (0, swagger_1.ApiTags)('financial-analysis'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('financial-analysis'),
    __metadata("design:paramtypes", [can_i_spend_service_1.CanISpendService,
        financial_capacity_service_1.FinancialCapacityService])
], FinancialAnalysisController);
//# sourceMappingURL=financial-analysis.controller.js.map