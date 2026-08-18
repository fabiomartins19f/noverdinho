import { HttpException, HttpStatus } from '@nestjs/common';
export type ErrorCode = 'USER_NOT_FOUND' | 'EMAIL_ALREADY_REGISTERED' | 'INVALID_CREDENTIALS' | 'INVALID_REFRESH_TOKEN' | 'SESSION_REVOKED' | 'USER_BLOCKED' | 'ACCOUNT_NOT_FOUND' | 'CATEGORY_NOT_FOUND' | 'TRANSACTION_NOT_FOUND' | 'CARD_NOT_FOUND' | 'INVOICE_NOT_FOUND' | 'DEBT_NOT_FOUND' | 'DEBT_INSTALLMENT_NOT_FOUND' | 'BUDGET_NOT_FOUND' | 'BUDGET_ALREADY_EXISTS' | 'GOAL_NOT_FOUND' | 'NOTIFICATION_NOT_FOUND' | 'INVALID_AMOUNT' | 'INVALID_PERIOD' | 'BUDGET_BELOW_MINIMUM' | 'NO_DEBTS_FOR_PLAN' | 'INSUFFICIENT_BALANCE' | 'CATEGORY_IN_USE' | 'DUPLICATE_IDEMPOTENCY_KEY' | 'RATE_LIMITED' | 'UNPROCESSABLE' | 'FORBIDDEN';
export declare class AppException extends HttpException {
    readonly code: ErrorCode;
    constructor(code: ErrorCode, message: string, status?: HttpStatus);
}
export declare class NotFoundException extends AppException {
    constructor(code?: ErrorCode, message?: string);
}
