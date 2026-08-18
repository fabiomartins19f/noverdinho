import { roundMoney, money, toNumber, percentOf, sumMoney } from './money';

describe('money (Decimal monetário)', () => {
  it('arredonda para 2 casas', () => {
    expect(roundMoney('1.005').toString()).toBe('1.01');
    expect(roundMoney('1.004').toString()).toBe('1');
    expect(roundMoney('12345.678').toString()).toBe('12345.68');
  });

  it('soma valores sem erro de ponto flutuante', () => {
    const sum = sumMoney([money(0.1), money(0.2)]);
    expect(sum.plus(0.7).eq(1)).toBe(true);
  });

  it('percentOf retorna 0 quando total é zero (evita divisão por zero)', () => {
    expect(percentOf(10, 0).toNumber()).toBe(0);
    expect(percentOf(10, 100).toNumber()).toBe(10);
  });

  it('toNumber trata nulos', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber('42.5')).toBe(42.5);
  });
});