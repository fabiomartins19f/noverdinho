"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditAction = exports.NotificationType = exports.InsightType = exports.InstallmentStatus = exports.InvoiceStatus = exports.GoalStatus = exports.PlanStrategy = exports.InterestType = exports.DebtPriority = exports.DebtStatus = exports.DebtType = exports.CategoryKind = exports.TransactionStatus = exports.TransactionType = exports.AccountType = exports.UserStatus = void 0;
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED'
};
exports.AccountType = {
    CHECKING: 'CHECKING',
    SAVINGS: 'SAVINGS',
    WALLET: 'WALLET',
    DIGITAL: 'DIGITAL',
    INVESTMENT: 'INVESTMENT',
    CASH: 'CASH',
    OTHER: 'OTHER'
};
exports.TransactionType = {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE',
    TRANSFER: 'TRANSFER',
    ADJUSTMENT: 'ADJUSTMENT'
};
exports.TransactionStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    CANCELED: 'CANCELED'
};
exports.CategoryKind = {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE'
};
exports.DebtType = {
    CREDIT_CARD: 'CREDIT_CARD',
    LOAN: 'LOAN',
    FINANCING: 'FINANCING',
    INSTALLMENT: 'INSTALLMENT',
    PERSONAL: 'PERSONAL',
    RENEGOTIATED: 'RENEGOTIATED',
    OTHER: 'OTHER'
};
exports.DebtStatus = {
    ACTIVE: 'ACTIVE',
    OVERDUE: 'OVERDUE',
    NEGOTIATED: 'NEGOTIATED',
    PAID_OFF: 'PAID_OFF',
    CANCELED: 'CANCELED'
};
exports.DebtPriority = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
};
exports.InterestType = {
    MONTHLY: 'MONTHLY',
    ANNUAL: 'ANNUAL',
    FIXED: 'FIXED'
};
exports.PlanStrategy = {
    AVALANCHE: 'AVALANCHE',
    SNOWBALL: 'SNOWBALL'
};
exports.GoalStatus = {
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    PAUSED: 'PAUSED'
};
exports.InvoiceStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    PAID: 'PAID'
};
exports.InstallmentStatus = {
    PENDING: 'PENDING',
    PAID: 'PAID',
    OVERDUE: 'OVERDUE',
    CANCELED: 'CANCELED'
};
exports.InsightType = {
    SPENDING_INCREASE: 'SPENDING_INCREASE',
    SPENDING_DECREASE: 'SPENDING_DECREASE',
    INCOME_COMMITMENT: 'INCOME_COMMITMENT',
    CARD_LIMIT: 'CARD_LIMIT',
    HIGH_INTEREST_DEBT: 'HIGH_INTEREST_DEBT',
    BUDGET_OVERRUN: 'BUDGET_OVERRUN',
    BUDGET_GOOD: 'BUDGET_GOOD',
    POSITIVE_EVOLUTION: 'POSITIVE_EVOLUTION',
    PAYOFF_OPPORTUNITY: 'PAYOFF_OPPORTUNITY'
};
exports.NotificationType = {
    DUE_SOON: 'DUE_SOON',
    OVERDUE: 'OVERDUE',
    INVOICE_DUE: 'INVOICE_DUE',
    CARD_LIMIT: 'CARD_LIMIT',
    BUDGET_OVERRUN: 'BUDGET_OVERRUN',
    DEBT_OVERDUE: 'DEBT_OVERDUE',
    GOAL_REACHED: 'GOAL_REACHED',
    PROGRESS: 'PROGRESS',
    PAYOFF_OPPORTUNITY: 'PAYOFF_OPPORTUNITY',
    SYSTEM: 'SYSTEM'
};
exports.AuditAction = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE',
    REGISTER: 'REGISTER',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    PAYMENT: 'PAYMENT',
    EXPORT: 'EXPORT',
    SETTINGS_CHANGE: 'SETTINGS_CHANGE'
};
//# sourceMappingURL=enums.js.map