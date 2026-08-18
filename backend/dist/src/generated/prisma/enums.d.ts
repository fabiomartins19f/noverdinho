export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const AccountType: {
    readonly CHECKING: "CHECKING";
    readonly SAVINGS: "SAVINGS";
    readonly WALLET: "WALLET";
    readonly DIGITAL: "DIGITAL";
    readonly INVESTMENT: "INVESTMENT";
    readonly CASH: "CASH";
    readonly OTHER: "OTHER";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const TransactionType: {
    readonly INCOME: "INCOME";
    readonly EXPENSE: "EXPENSE";
    readonly TRANSFER: "TRANSFER";
    readonly ADJUSTMENT: "ADJUSTMENT";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const TransactionStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly CANCELED: "CANCELED";
};
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export declare const CategoryKind: {
    readonly INCOME: "INCOME";
    readonly EXPENSE: "EXPENSE";
};
export type CategoryKind = (typeof CategoryKind)[keyof typeof CategoryKind];
export declare const DebtType: {
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly LOAN: "LOAN";
    readonly FINANCING: "FINANCING";
    readonly INSTALLMENT: "INSTALLMENT";
    readonly PERSONAL: "PERSONAL";
    readonly RENEGOTIATED: "RENEGOTIATED";
    readonly OTHER: "OTHER";
};
export type DebtType = (typeof DebtType)[keyof typeof DebtType];
export declare const DebtStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly OVERDUE: "OVERDUE";
    readonly NEGOTIATED: "NEGOTIATED";
    readonly PAID_OFF: "PAID_OFF";
    readonly CANCELED: "CANCELED";
};
export type DebtStatus = (typeof DebtStatus)[keyof typeof DebtStatus];
export declare const DebtPriority: {
    readonly HIGH: "HIGH";
    readonly MEDIUM: "MEDIUM";
    readonly LOW: "LOW";
};
export type DebtPriority = (typeof DebtPriority)[keyof typeof DebtPriority];
export declare const InterestType: {
    readonly MONTHLY: "MONTHLY";
    readonly ANNUAL: "ANNUAL";
    readonly FIXED: "FIXED";
};
export type InterestType = (typeof InterestType)[keyof typeof InterestType];
export declare const PlanStrategy: {
    readonly AVALANCHE: "AVALANCHE";
    readonly SNOWBALL: "SNOWBALL";
};
export type PlanStrategy = (typeof PlanStrategy)[keyof typeof PlanStrategy];
export declare const GoalStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly PAUSED: "PAUSED";
};
export type GoalStatus = (typeof GoalStatus)[keyof typeof GoalStatus];
export declare const InvoiceStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
    readonly PAID: "PAID";
};
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
export declare const InstallmentStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly OVERDUE: "OVERDUE";
    readonly CANCELED: "CANCELED";
};
export type InstallmentStatus = (typeof InstallmentStatus)[keyof typeof InstallmentStatus];
export declare const InsightType: {
    readonly SPENDING_INCREASE: "SPENDING_INCREASE";
    readonly SPENDING_DECREASE: "SPENDING_DECREASE";
    readonly INCOME_COMMITMENT: "INCOME_COMMITMENT";
    readonly CARD_LIMIT: "CARD_LIMIT";
    readonly HIGH_INTEREST_DEBT: "HIGH_INTEREST_DEBT";
    readonly BUDGET_OVERRUN: "BUDGET_OVERRUN";
    readonly BUDGET_GOOD: "BUDGET_GOOD";
    readonly POSITIVE_EVOLUTION: "POSITIVE_EVOLUTION";
    readonly PAYOFF_OPPORTUNITY: "PAYOFF_OPPORTUNITY";
};
export type InsightType = (typeof InsightType)[keyof typeof InsightType];
export declare const NotificationType: {
    readonly DUE_SOON: "DUE_SOON";
    readonly OVERDUE: "OVERDUE";
    readonly INVOICE_DUE: "INVOICE_DUE";
    readonly CARD_LIMIT: "CARD_LIMIT";
    readonly BUDGET_OVERRUN: "BUDGET_OVERRUN";
    readonly DEBT_OVERDUE: "DEBT_OVERDUE";
    readonly GOAL_REACHED: "GOAL_REACHED";
    readonly PROGRESS: "PROGRESS";
    readonly PAYOFF_OPPORTUNITY: "PAYOFF_OPPORTUNITY";
    readonly SYSTEM: "SYSTEM";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const AuditAction: {
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly PASSWORD_CHANGE: "PASSWORD_CHANGE";
    readonly REGISTER: "REGISTER";
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly PAYMENT: "PAYMENT";
    readonly EXPORT: "EXPORT";
    readonly SETTINGS_CHANGE: "SETTINGS_CHANGE";
};
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
