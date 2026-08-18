"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const financial_capacity_service_1 = require("./financial-capacity.service");
describe('FinancialCapacityService', () => {
    const service = new financial_capacity_service_1.FinancialCapacityService();
    it('calcula capacidade = receitas - essenciais - compromissos', () => {
        const result = service.compute({
            monthlyIncome: 8000,
            essentialExpenses: 3000,
            mandatoryCommitments: 2000,
        });
        expect(result.availableCapacity).toBe(3000);
        expect(result.freeCash).toBe(3000);
    });
    it('preserva margem de segurança configurável (default 20%)', () => {
        const result = service.compute({
            monthlyIncome: 8000,
            essentialExpenses: 3000,
            mandatoryCommitments: 2000,
        });
        expect(result.marginOfSafety).toBe(600);
        expect(result.maxDebtPayment).toBe(2400);
    });
    it('com margem de 0%, permite comprometer todo o dinheiro livre', () => {
        const result = service.compute({
            monthlyIncome: 8000,
            essentialExpenses: 3000,
            mandatoryCommitments: 2000,
            safetyMarginPercent: 0,
        });
        expect(result.maxDebtPayment).toBe(3000);
    });
    it('nunca recomenda capacidade negativa', () => {
        const result = service.compute({
            monthlyIncome: 2000,
            essentialExpenses: 2500,
            mandatoryCommitments: 1000,
        });
        expect(result.availableCapacity).toBe(0);
        expect(result.maxDebtPayment).toBe(0);
        expect(result.marginOfSafety).toBe(0);
    });
    it('calcula o índice de comprometimento da renda', () => {
        const result = service.compute({
            monthlyIncome: 10000,
            essentialExpenses: 4000,
            mandatoryCommitments: 1000,
        });
        expect(result.commitmentRatio).toBe(50);
    });
    it('comprometimento 100% quando renda é zero', () => {
        const result = service.compute({
            monthlyIncome: 0,
            essentialExpenses: 0,
            mandatoryCommitments: 0,
        });
        expect(result.commitmentRatio).toBe(100);
    });
});
//# sourceMappingURL=financial-capacity.service.spec.js.map