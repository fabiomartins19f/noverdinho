import { DebtPriorityInput, DebtPriorityService, PriorityStrategy } from './debt-priority.service';
export interface PayoffInputDebt extends DebtPriorityInput {
    type: string;
    dueDate: string;
}
export interface PayoffSimulationResult {
    strategy: PriorityStrategy;
    monthlyBudget: number;
    order: Array<{
        debtId: string;
        creditor: string;
        order: number;
        payoffMonth: number;
        projectedPayoffDate: string;
        amountPerMonth: number;
    }>;
    estimatedMonths: number;
    estimatedInterest: number;
    estimatedTotal: number;
    baselineInterest: number;
    economy: number;
    projectedPayoffDate: string;
    feasible: boolean;
}
export interface SimulationState {
    id: string;
    creditor: string;
    balance: number;
    annualRate: number;
    minimum: number;
    payoffMonth: number | null;
    amountPerMonth: number;
}
export declare class PayoffSimulationService {
    private readonly priority;
    constructor(priority: DebtPriorityService);
    simulate(input: {
        debts: PayoffInputDebt[];
        monthlyBudget: number;
        strategy: PriorityStrategy;
    }): PayoffSimulationResult;
    private simulateMonths;
    private projectedDate;
}
