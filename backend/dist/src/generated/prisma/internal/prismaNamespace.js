"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.AuditLogScalarFieldEnum = exports.PushDeviceScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.FinancialInsightScalarFieldEnum = exports.GoalScalarFieldEnum = exports.BudgetCategoryScalarFieldEnum = exports.BudgetScalarFieldEnum = exports.DebtPayoffPlanItemScalarFieldEnum = exports.DebtPayoffPlanScalarFieldEnum = exports.DebtPaymentScalarFieldEnum = exports.DebtInstallmentScalarFieldEnum = exports.DebtScalarFieldEnum = exports.CreditCardInstallmentScalarFieldEnum = exports.CreditCardPurchaseScalarFieldEnum = exports.CreditCardInvoiceScalarFieldEnum = exports.CreditCardScalarFieldEnum = exports.TransactionScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.AccountScalarFieldEnum = exports.PasswordResetTokenScalarFieldEnum = exports.SessionScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Session: 'Session',
    PasswordResetToken: 'PasswordResetToken',
    Account: 'Account',
    Category: 'Category',
    Transaction: 'Transaction',
    CreditCard: 'CreditCard',
    CreditCardInvoice: 'CreditCardInvoice',
    CreditCardPurchase: 'CreditCardPurchase',
    CreditCardInstallment: 'CreditCardInstallment',
    Debt: 'Debt',
    DebtInstallment: 'DebtInstallment',
    DebtPayment: 'DebtPayment',
    DebtPayoffPlan: 'DebtPayoffPlan',
    DebtPayoffPlanItem: 'DebtPayoffPlanItem',
    Budget: 'Budget',
    BudgetCategory: 'BudgetCategory',
    Goal: 'Goal',
    FinancialInsight: 'FinancialInsight',
    Notification: 'Notification',
    PushDevice: 'PushDevice',
    AuditLog: 'AuditLog'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    avatarUrl: 'avatarUrl',
    currency: 'currency',
    timezone: 'timezone',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    refreshTokenHash: 'refreshTokenHash',
    userAgent: 'userAgent',
    ip: 'ip',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
};
exports.PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.AccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    type: 'type',
    initialBalance: 'initialBalance',
    currentBalance: 'currentBalance',
    institution: 'institution',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    icon: 'icon',
    color: 'color',
    kind: 'kind',
    isDefault: 'isDefault',
    archived: 'archived',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TransactionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    accountId: 'accountId',
    transferAccountId: 'transferAccountId',
    categoryId: 'categoryId',
    type: 'type',
    amount: 'amount',
    description: 'description',
    transactionDate: 'transactionDate',
    status: 'status',
    recurring: 'recurring',
    recurrenceRule: 'recurrenceRule',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CreditCardScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    institution: 'institution',
    limit: 'limit',
    closingDay: 'closingDay',
    dueDay: 'dueDay',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CreditCardInvoiceScalarFieldEnum = {
    id: 'id',
    cardId: 'cardId',
    userId: 'userId',
    referenceMonth: 'referenceMonth',
    referenceYear: 'referenceYear',
    closingDate: 'closingDate',
    dueDate: 'dueDate',
    amount: 'amount',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CreditCardPurchaseScalarFieldEnum = {
    id: 'id',
    cardId: 'cardId',
    userId: 'userId',
    categoryId: 'categoryId',
    description: 'description',
    amount: 'amount',
    purchaseDate: 'purchaseDate',
    installmentCount: 'installmentCount',
    createdAt: 'createdAt'
};
exports.CreditCardInstallmentScalarFieldEnum = {
    id: 'id',
    purchaseId: 'purchaseId',
    cardId: 'cardId',
    userId: 'userId',
    invoiceId: 'invoiceId',
    number: 'number',
    amount: 'amount',
    dueDate: 'dueDate',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DebtScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    creditor: 'creditor',
    type: 'type',
    originalAmount: 'originalAmount',
    currentBalance: 'currentBalance',
    interestRate: 'interestRate',
    interestType: 'interestType',
    penaltyRate: 'penaltyRate',
    installmentAmount: 'installmentAmount',
    totalInstallments: 'totalInstallments',
    paidInstallments: 'paidInstallments',
    dueDate: 'dueDate',
    status: 'status',
    priority: 'priority',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DebtInstallmentScalarFieldEnum = {
    id: 'id',
    debtId: 'debtId',
    userId: 'userId',
    installmentNumber: 'installmentNumber',
    dueDate: 'dueDate',
    principalAmount: 'principalAmount',
    interestAmount: 'interestAmount',
    penaltyAmount: 'penaltyAmount',
    totalAmount: 'totalAmount',
    paidAmount: 'paidAmount',
    status: 'status',
    paidAt: 'paidAt',
    createdAt: 'createdAt'
};
exports.DebtPaymentScalarFieldEnum = {
    id: 'id',
    debtId: 'debtId',
    installmentId: 'installmentId',
    userId: 'userId',
    amount: 'amount',
    paymentDate: 'paymentDate',
    note: 'note',
    createdAt: 'createdAt'
};
exports.DebtPayoffPlanScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    strategy: 'strategy',
    monthlyBudget: 'monthlyBudget',
    estimatedMonths: 'estimatedMonths',
    estimatedInterest: 'estimatedInterest',
    estimatedTotal: 'estimatedTotal',
    baselineInterest: 'baselineInterest',
    projectedPayoffDate: 'projectedPayoffDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DebtPayoffPlanItemScalarFieldEnum = {
    id: 'id',
    planId: 'planId',
    debtId: 'debtId',
    order: 'order',
    payoffMonth: 'payoffMonth',
    projectedPayoffDate: 'projectedPayoffDate',
    amountPerMonth: 'amountPerMonth'
};
exports.BudgetScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    month: 'month',
    year: 'year',
    totalLimit: 'totalLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BudgetCategoryScalarFieldEnum = {
    id: 'id',
    budgetId: 'budgetId',
    categoryId: 'categoryId',
    name: 'name',
    limit: 'limit',
    spent: 'spent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.GoalScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    emoji: 'emoji',
    targetAmount: 'targetAmount',
    currentAmount: 'currentAmount',
    targetDate: 'targetDate',
    priority: 'priority',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FinancialInsightScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    description: 'description',
    action: 'action',
    importance: 'importance',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    data: 'data',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.PushDeviceScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    platform: 'platform',
    apnsTopic: 'apnsTopic',
    lastSeenAt: 'lastSeenAt',
    createdAt: 'createdAt'
};
exports.AuditLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    metadata: 'metadata',
    ip: 'ip',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map