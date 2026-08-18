export interface CapacityInput {
    monthlyIncome: number;
    essentialExpenses: number;
    mandatoryCommitments: number;
    safetyMarginPercent?: number;
}
export interface CapacityResult {
    availableCapacity: number;
    maxDebtPayment: number;
    marginOfSafety: number;
    commitmentRatio: number;
    freeCash: number;
}
export declare class FinancialCapacityService {
    compute(input: CapacityInput): CapacityResult;
}
