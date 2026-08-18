export declare class CreateDebtDto {
    creditor: string;
    type: 'CREDIT_CARD' | 'LOAN' | 'FINANCING' | 'INSTALLMENT' | 'PERSONAL' | 'RENEGOTIATED' | 'OTHER';
    originalAmount: number;
    currentBalance?: number;
    interestRate?: number;
    interestType?: 'MONTHLY' | 'ANNUAL' | 'FIXED';
    penaltyRate?: number;
    installmentAmount?: number;
    totalInstallments?: number;
    dueDate: string;
    status?: 'ACTIVE' | 'OVERDUE' | 'NEGOTIATED';
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
    notes?: string;
}
export declare class UpdateDebtDto {
    creditor?: string;
    interestRate?: number;
    interestType?: 'MONTHLY' | 'ANNUAL' | 'FIXED';
    penaltyRate?: number;
    installmentAmount?: number;
    dueDate?: string;
    status?: 'ACTIVE' | 'OVERDUE' | 'NEGOTIATED' | 'PAID_OFF' | 'CANCELED';
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
    notes?: string;
}
export declare class RegisterDebtPaymentDto {
    amount: number;
    paymentDate?: string;
    installmentId?: string;
    note?: string;
}
export declare class ListDebtsQueryDto {
    status?: string;
    type?: string;
    priority?: string;
}
