"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payoff_simulation_service_1 = require("./payoff-simulation.service");
const debt_priority_service_1 = require("./debt-priority.service");
describe('PayoffSimulationService', () => {
    const service = new payoff_simulation_service_1.PayoffSimulationService(new debt_priority_service_1.DebtPriorityService());
    const debt = (partial) => ({
        totalInstallments: null,
        paidInstallments: 0,
        status: 'ACTIVE',
        type: 'LOAN',
        dueDate: new Date().toISOString(),
        ...partial,
    });
    it('quita uma única dívida no prazo esperado', () => {
        const result = service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 1000,
            debts: [debt({ id: 'd1', creditor: 'Banco', currentBalance: 12000, annualRate: 0, installmentAmount: 1000 })],
        });
        expect(result.estimatedMonths).toBe(12);
        expect(result.estimatedInterest).toBe(0);
        expect(result.economy).toBe(0);
        expect(result.feasible).toBe(true);
    });
    it('AVALANCHE minimiza juros totais em comparação à BOLA DE NEVE', () => {
        const debts = [
            debt({ id: 'high', creditor: 'Cartão', currentBalance: 4000, annualRate: 60, installmentAmount: 300 }),
            debt({ id: 'low', creditor: 'Empréstimo', currentBalance: 3000, annualRate: 24, installmentAmount: 150 }),
        ];
        const avalanche = service.simulate({ strategy: 'AVALANCHE', monthlyBudget: 700, debts });
        const snowball = service.simulate({ strategy: 'SNOWBALL', monthlyBudget: 700, debts });
        expect(avalanche.estimatedInterest).toBeLessThanOrEqual(snowball.estimatedInterest);
        expect(avalanche.order[0].debtId).toBe('high');
        expect(snowball.order[0].debtId).toBe('low');
    });
    it('economia estimada é positiva quando há juros', () => {
        const result = service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 600,
            debts: [
                debt({ id: 'a', creditor: 'Cartão', currentBalance: 5000, annualRate: 240, installmentAmount: 200 }),
                debt({ id: 'b', creditor: 'Banco', currentBalance: 8000, annualRate: 60, installmentAmount: 150 }),
            ],
        });
        expect(result.economy).toBeGreaterThan(0);
        expect(result.estimatedInterest).toBeGreaterThan(0);
    });
    it('lança erro quando orçamento é zero', () => {
        expect(() => service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 0,
            debts: [debt({ id: 'a', creditor: 'A', currentBalance: 1000, annualRate: 10, installmentAmount: 50 })],
        })).toThrow();
    });
    it('marca como inviável quando orçamento < soma das parcelas mínimas', () => {
        const result = service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 200,
            debts: [
                debt({ id: 'a', creditor: 'A', currentBalance: 5000, annualRate: 20, installmentAmount: 300 }),
                debt({ id: 'b', creditor: 'B', currentBalance: 5000, annualRate: 20, installmentAmount: 300 }),
            ],
        });
        expect(result.feasible).toBe(false);
    });
    it('lança erro sem dívidas ativas', () => {
        expect(() => service.simulate({ strategy: 'AVALANCHE', monthlyBudget: 500, debts: [] })).toThrow(/dívidas ativas/);
    });
    it('dívidas quitadas não entram na simulação', () => {
        const result = service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 500,
            debts: [
                debt({ id: 'paid', creditor: 'Paga', currentBalance: 0, annualRate: 100, installmentAmount: 0, status: 'PAID_OFF' }),
                debt({ id: 'active', creditor: 'Ativa', currentBalance: 3000, annualRate: 0, installmentAmount: 500 }),
            ],
        });
        expect(result.order).toHaveLength(1);
        expect(result.order[0].debtId).toBe('active');
    });
    it('funciona com valores decimais (arredondamento monetário)', () => {
        const result = service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 1234.56,
            debts: [debt({ id: 'd1', creditor: 'Banco', currentBalance: 9999.99, annualRate: 45.5, installmentAmount: 350.75 })],
        });
        expect(result.estimatedInterest).toBeGreaterThanOrEqual(0);
        expect(result.estimatedTotal).toBeGreaterThan(0);
        expect(result.estimatedTotal).toBeLessThanOrEqual(1234.56 * result.estimatedMonths + 1);
        for (const item of result.order) {
            expect(item.amountPerMonth).toBeLessThanOrEqual(1234.56 + 0.01);
        }
    });
    it('é determinístico', () => {
        const input = {
            strategy: 'AVALANCHE',
            monthlyBudget: 800,
            debts: [
                debt({ id: 'a', creditor: 'A', currentBalance: 2500, annualRate: 120, installmentAmount: 100 }),
                debt({ id: 'b', creditor: 'B', currentBalance: 7000, annualRate: 36, installmentAmount: 300 }),
            ],
        };
        const first = service.simulate(input);
        const second = service.simulate(input);
        expect(first.estimatedMonths).toBe(second.estimatedMonths);
        expect(first.estimatedInterest).toBe(second.estimatedInterest);
        expect(first.order.map((o) => o.debtId)).toEqual(second.order.map((o) => o.debtId));
    });
    it('lida com taxas muito altas sem estourar (teto de 40 anos)', () => {
        const result = service.simulate({
            strategy: 'AVALANCHE',
            monthlyBudget: 100,
            debts: [debt({ id: 'a', creditor: 'Rotativo', currentBalance: 50000, annualRate: 400, installmentAmount: 90 })],
        });
        expect(result.estimatedMonths).toBeLessThanOrEqual(480);
    });
});
//# sourceMappingURL=payoff-simulation.service.spec.js.map