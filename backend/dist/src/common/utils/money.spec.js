"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const money_1 = require("./money");
describe('money (Decimal monetário)', () => {
    it('arredonda para 2 casas', () => {
        expect((0, money_1.roundMoney)('1.005').toString()).toBe('1.01');
        expect((0, money_1.roundMoney)('1.004').toString()).toBe('1');
        expect((0, money_1.roundMoney)('12345.678').toString()).toBe('12345.68');
    });
    it('soma valores sem erro de ponto flutuante', () => {
        const sum = (0, money_1.sumMoney)([(0, money_1.money)(0.1), (0, money_1.money)(0.2)]);
        expect(sum.plus(0.7).eq(1)).toBe(true);
    });
    it('percentOf retorna 0 quando total é zero (evita divisão por zero)', () => {
        expect((0, money_1.percentOf)(10, 0).toNumber()).toBe(0);
        expect((0, money_1.percentOf)(10, 100).toNumber()).toBe(10);
    });
    it('toNumber trata nulos', () => {
        expect((0, money_1.toNumber)(null)).toBe(0);
        expect((0, money_1.toNumber)(undefined)).toBe(0);
        expect((0, money_1.toNumber)('42.5')).toBe(42.5);
    });
});
//# sourceMappingURL=money.spec.js.map