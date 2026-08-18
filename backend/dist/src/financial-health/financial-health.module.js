"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialHealthModule = void 0;
const common_1 = require("@nestjs/common");
const financial_health_score_service_1 = require("./financial-health-score.service");
const financial_health_service_1 = require("./financial-health.service");
const financial_health_controller_1 = require("./financial-health.controller");
let FinancialHealthModule = class FinancialHealthModule {
};
exports.FinancialHealthModule = FinancialHealthModule;
exports.FinancialHealthModule = FinancialHealthModule = __decorate([
    (0, common_1.Module)({
        providers: [financial_health_score_service_1.FinancialHealthScoreService, financial_health_service_1.FinancialHealthService],
        controllers: [financial_health_controller_1.FinancialHealthController],
        exports: [financial_health_score_service_1.FinancialHealthScoreService, financial_health_service_1.FinancialHealthService],
    })
], FinancialHealthModule);
//# sourceMappingURL=financial-health.module.js.map