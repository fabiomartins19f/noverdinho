import { FinancialHealthScoreService } from './financial-health-score.service';

describe('FinancialHealthScoreService (Nível No Verdinho)', () => {
  const service = new FinancialHealthScoreService();

  const healthy = {
    commitmentRatio: 20,
    income: 8000,
    totalDebt: 0,
    overdueDebtCount: 0,
    overdueCardInstallmentCount: 0,
    cardUtilization: 5,
    savingsRate: 0.3,
    budgetCategoriesOver: 0,
    budgetCategoriesTotal: 4,
    reserveMonths: 6,
  };

  it('usuário saudável fica no verdinho (EXCELLENT)', () => {
    const result = service.compute(healthy);
    expect(result.score).toBeGreaterThanOrEqual(85);
    expect(result.band).toBe('EXCELLENT');
  });

  it('usuário endividado e comprometido fica em nível crítico', () => {
    const result = service.compute({
      ...healthy,
      commitmentRatio: 95,
      totalDebt: 200000,
      overdueDebtCount: 3,
      cardUtilization: 95,
      savingsRate: 0,
      reserveMonths: 0,
    });
    expect(result.score).toBeLessThanOrEqual(29);
    expect(result.band).toBe('CRITICAL');
  });

  it('faixas intermediárias: ATENÇÃO, EM EVOLUÇÃO, NO CAMINHO', () => {
    expect(service.compute({ ...healthy, commitmentRatio: 80, totalDebt: 100000, savingsRate: 0, reserveMonths: 0.5 }).band).toBe('ATTENTION');
    expect(service.compute({ ...healthy, commitmentRatio: 60, totalDebt: 40000, savingsRate: 0.05, reserveMonths: 1 }).band).toBe('EVOLVING');
    expect(service.compute({ ...healthy, commitmentRatio: 40, totalDebt: 12000, savingsRate: 0.12, reserveMonths: 2.5 }).band).toBe('ON_TRACK');
  });

  it('score sempre entre 0 e 100', () => {
    for (const m of [
      healthy,
      { ...healthy, commitmentRatio: -50, totalDebt: 0 },
      { ...healthy, commitmentRatio: 500, totalDebt: 0, savingsRate: 5 },
    ]) {
      const result = service.compute(m);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    }
  });

  it('atrasos penalizam o score', () => {
    const clean = service.compute(healthy).score;
    const withOverdue = service.compute({ ...healthy, overdueDebtCount: 2, overdueCardInstallmentCount: 3 }).score;
    expect(withOverdue).toBeLessThan(clean);
  });

  it('a soma dos pesos é 100%', () => {
    const result = service.compute(healthy);
    const totalWeight = result.breakdown.reduce((acc, b) => acc + b.weight, 0);
    expect(totalWeight).toBeCloseTo(1, 5);
  });
});