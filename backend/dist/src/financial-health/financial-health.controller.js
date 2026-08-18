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
exports.FinancialHealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const financial_health_service_1 = require("./financial-health.service");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
class EvolutionQueryDto {
    months;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2),
    (0, class_validator_1.Max)(24),
    __metadata("design:type", Number)
], EvolutionQueryDto.prototype, "months", void 0);
let FinancialHealthController = class FinancialHealthController {
    health;
    constructor(health) {
        this.health = health;
    }
    score(user) {
        return this.health.currentScore(user.id);
    }
    evolution(user, query) {
        return this.health.evolution(user.id, query.months ?? 6);
    }
};
exports.FinancialHealthController = FinancialHealthController;
__decorate([
    (0, common_1.Get)('score'),
    (0, swagger_1.ApiOperation)({
        summary: 'Nível No Verdinho (0-100)',
        description: 'Indicador interno de organização financeira, com evolução dos últimos 6 meses.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FinancialHealthController.prototype, "score", null);
__decorate([
    (0, common_1.Get)('evolution'),
    (0, swagger_1.ApiOperation)({ summary: 'Evolução mensal do score' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, EvolutionQueryDto]),
    __metadata("design:returntype", void 0)
], FinancialHealthController.prototype, "evolution", null);
exports.FinancialHealthController = FinancialHealthController = __decorate([
    (0, swagger_1.ApiTags)('financial-health'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('financial-health'),
    __metadata("design:paramtypes", [financial_health_service_1.FinancialHealthService])
], FinancialHealthController);
//# sourceMappingURL=financial-health.controller.js.map