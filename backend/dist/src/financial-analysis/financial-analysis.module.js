"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialAnalysisModule = void 0;
const common_1 = require("@nestjs/common");
const financial_capacity_service_1 = require("./financial-capacity.service");
const can_i_spend_service_1 = require("./can-i-spend.service");
const financial_analysis_controller_1 = require("./financial-analysis.controller");
let FinancialAnalysisModule = class FinancialAnalysisModule {
};
exports.FinancialAnalysisModule = FinancialAnalysisModule;
exports.FinancialAnalysisModule = FinancialAnalysisModule = __decorate([
    (0, common_1.Module)({
        providers: [financial_capacity_service_1.FinancialCapacityService, can_i_spend_service_1.CanISpendService],
        controllers: [financial_analysis_controller_1.FinancialAnalysisController],
        exports: [financial_capacity_service_1.FinancialCapacityService, can_i_spend_service_1.CanISpendService],
    })
], FinancialAnalysisModule);
//# sourceMappingURL=financial-analysis.module.js.map