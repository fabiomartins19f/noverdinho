"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialCapacityService = void 0;
const common_1 = require("@nestjs/common");
let FinancialCapacityService = class FinancialCapacityService {
    compute(input) {
        const income = Math.max(0, input.monthlyIncome);
        const essentials = Math.max(0, input.essentialExpenses);
        const commitments = Math.max(0, input.mandatoryCommitments);
        const safety = Math.min(0.5, Math.max(0, input.safetyMarginPercent ?? 0.2));
        const freeCash = income - essentials - commitments;
        const marginOfSafety = Math.max(0, freeCash * safety);
        const maxDebtPayment = Math.max(0, freeCash - marginOfSafety);
        const commitmentRatio = income > 0 ? ((essentials + commitments) / income) * 100 : 100;
        return {
            availableCapacity: Math.max(0, freeCash),
            maxDebtPayment,
            marginOfSafety,
            commitmentRatio,
            freeCash,
        };
    }
};
exports.FinancialCapacityService = FinancialCapacityService;
exports.FinancialCapacityService = FinancialCapacityService = __decorate([
    (0, common_1.Injectable)()
], FinancialCapacityService);
//# sourceMappingURL=financial-capacity.service.js.map