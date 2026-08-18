export interface DebtPriorityInput {
    id: string;
    creditor: string;
    currentBalance: number;
    annualRate: number;
    installmentAmount: number;
    totalInstallments: number | null;
    paidInstallments: number;
    status: 'ACTIVE' | 'OVERDUE' | 'NEGOTIATED' | 'PAID_OFF' | 'CANCELED';
}
export type PriorityStrategy = 'AVALANCHE' | 'SNOWBALL';
export interface OrderedDebt {
    debt: DebtPriorityInput;
    order: number;
}
export declare class DebtPriorityService {
    orderDebts(debts: DebtPriorityInput[], strategy: PriorityStrategy): OrderedDebt[];
}
