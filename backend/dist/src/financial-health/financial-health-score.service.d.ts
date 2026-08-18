export interface HealthScoreMetrics {
    commitmentRatio: number;
    income: number;
    totalDebt: number;
    overdueDebtCount: number;
    overdueCardInstallmentCount: number;
    cardUtilization: number;
    savingsRate: number;
    budgetCategoriesOver: number;
    budgetCategoriesTotal: number;
    reserveMonths: number;
}
export interface HealthScoreResult {
    score: number;
    band: 'CRITICAL' | 'ATTENTION' | 'EVOLVING' | 'ON_TRACK' | 'EXCELLENT';
    bandLabel: string;
    message: string;
    breakdown: Array<{
        factor: string;
        weight: number;
        value: number;
    }>;
}
export type ScoreBand = HealthScoreResult['band'];
export declare class FinancialHealthScoreService {
    compute(m: HealthScoreMetrics): HealthScoreResult;
    private bandFor;
}
