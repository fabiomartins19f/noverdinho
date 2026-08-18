"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtPriorityService = void 0;
const common_1 = require("@nestjs/common");
let DebtPriorityService = class DebtPriorityService {
    orderDebts(debts, strategy) {
        const active = debts.filter((d) => d.status !== 'PAID_OFF' && d.status !== 'CANCELED' && d.currentBalance > 0);
        const sorted = [...active].sort((a, b) => {
            if (strategy === 'AVALANCHE') {
                const rateDiff = b.annualRate - a.annualRate;
                if (rateDiff !== 0)
                    return rateDiff;
                const balanceDiff = b.currentBalance - a.currentBalance;
                if (balanceDiff !== 0)
                    return balanceDiff;
                return a.creditor.localeCompare(b.creditor);
            }
            const balanceDiff = a.currentBalance - b.currentBalance;
            if (balanceDiff !== 0)
                return balanceDiff;
            const remainingA = a.totalInstallments !== null ? a.totalInstallments - a.paidInstallments : Infinity;
            const remainingB = b.totalInstallments !== null ? b.totalInstallments - b.paidInstallments : Infinity;
            const installmentsDiff = remainingA - remainingB;
            if (installmentsDiff !== 0)
                return installmentsDiff;
            return a.creditor.localeCompare(b.creditor);
        });
        return sorted.map((debt, index) => ({ debt, order: index + 1 }));
    }
};
exports.DebtPriorityService = DebtPriorityService;
exports.DebtPriorityService = DebtPriorityService = __decorate([
    (0, common_1.Injectable)()
], DebtPriorityService);
//# sourceMappingURL=debt-priority.service.js.map