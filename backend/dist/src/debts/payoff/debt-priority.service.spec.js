"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debt_priority_service_1 = require("./debt-priority.service");
describe('DebtPriorityService', () => {
    const service = new debt_priority_service_1.DebtPriorityService();
    const debt = (partial) => ({
        totalInstallments: null,
        paidInstallments: 0,
        status: 'ACTIVE',
        ...partial,
    });
    it('AVALANCHE prioriza a maior taxa de juros', () => {
        const ordered = service.orderDebts([
            debt({ id: 'a', creditor: 'Cartão', currentBalance: 2000, annualRate: 240, installmentAmount: 100 }),
            debt({ id: 'b', creditor: 'Empréstimo', currentBalance: 9000, annualRate: 30, installmentAmount: 400 }),
        ], 'AVALANCHE');
        expect(ordered[0].debt.id).toBe('a');
        expect(ordered[1].debt.id).toBe('b');
    });
    it('AVALANCHE desempata por maior saldo', () => {
        const ordered = service.orderDebts([
            debt({ id: 'a', creditor: 'A', currentBalance: 1000, annualRate: 30, installmentAmount: 50 }),
            debt({ id: 'b', creditor: 'B', currentBalance: 5000, annualRate: 30, installmentAmount: 50 }),
        ], 'AVALANCHE');
        expect(ordered[0].debt.id).toBe('b');
    });
    it('BOLA DE NEVE prioriza a menor dívida', () => {
        const ordered = service.orderDebts([
            debt({ id: 'a', creditor: 'Financiamento', currentBalance: 40000, annualRate: 12, installmentAmount: 800 }),
            debt({ id: 'b', creditor: 'Parcelamento', currentBalance: 900, annualRate: 60, installmentAmount: 100 }),
            debt({ id: 'c', creditor: 'Empréstimo', currentBalance: 5000, annualRate: 20, installmentAmount: 200 }),
        ], 'SNOWBALL');
        expect(ordered.map((o) => o.debt.id)).toEqual(['b', 'c', 'a']);
    });
    it('BOLA DE NEVE desempata pelo menor número de parcelas restantes', () => {
        const ordered = service.orderDebts([
            debt({ id: 'a', creditor: 'A', currentBalance: 2000, annualRate: 10, installmentAmount: 100, totalInstallments: 20, paidInstallments: 0 }),
            debt({ id: 'b', creditor: 'B', currentBalance: 2000, annualRate: 10, installmentAmount: 200, totalInstallments: 10, paidInstallments: 0 }),
        ], 'SNOWBALL');
        expect(ordered[0].debt.id).toBe('b');
    });
    it('exclui dívidas quitadas e canceladas', () => {
        const ordered = service.orderDebts([
            debt({ id: 'a', creditor: 'A', currentBalance: 1000, annualRate: 10, installmentAmount: 100 }),
            debt({ id: 'b', creditor: 'B', currentBalance: 0, annualRate: 10, installmentAmount: 100, status: 'PAID_OFF' }),
            debt({ id: 'c', creditor: 'C', currentBalance: 500, annualRate: 10, installmentAmount: 100, status: 'CANCELED' }),
        ], 'AVALANCHE');
        expect(ordered).toHaveLength(1);
        expect(ordered[0].debt.id).toBe('a');
    });
    it('é determinístico (mesma entrada, mesma ordem)', () => {
        const input = [
            debt({ id: 'a', creditor: 'Zeta', currentBalance: 3000, annualRate: 90, installmentAmount: 200 }),
            debt({ id: 'b', creditor: 'Alfa', currentBalance: 3000, annualRate: 90, installmentAmount: 200 }),
        ];
        const first = service.orderDebts(input, 'AVALANCHE').map((o) => o.debt.id);
        const second = service.orderDebts(input, 'AVALANCHE').map((o) => o.debt.id);
        expect(first).toEqual(second);
    });
});
//# sourceMappingURL=debt-priority.service.spec.js.map