"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDebtsQueryDto = exports.RegisterDebtPaymentDto = exports.UpdateDebtDto = exports.CreateDebtDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDebtDto {
    creditor;
    type;
    originalAmount;
    currentBalance;
    interestRate;
    interestType;
    penaltyRate;
    installmentAmount;
    totalInstallments;
    dueDate;
    status;
    priority;
    notes;
}
exports.CreateDebtDto = CreateDebtDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "creditor", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['CREDIT_CARD', 'LOAN', 'FINANCING', 'INSTALLMENT', 'PERSONAL', 'RENEGOTIATED', 'OTHER']),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "originalAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "currentBalance", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 4 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "interestRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['MONTHLY', 'ANNUAL', 'FIXED']),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "interestType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 4 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "penaltyRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "installmentAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(600),
    __metadata("design:type", Number)
], CreateDebtDto.prototype, "totalInstallments", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ACTIVE', 'OVERDUE', 'NEGOTIATED']),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['HIGH', 'MEDIUM', 'LOW']),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateDebtDto.prototype, "notes", void 0);
class UpdateDebtDto {
    creditor;
    interestRate;
    interestType;
    penaltyRate;
    installmentAmount;
    dueDate;
    status;
    priority;
    notes;
}
exports.UpdateDebtDto = UpdateDebtDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "creditor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 4 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], UpdateDebtDto.prototype, "interestRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['MONTHLY', 'ANNUAL', 'FIXED']),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "interestType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 4 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], UpdateDebtDto.prototype, "penaltyRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], UpdateDebtDto.prototype, "installmentAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ACTIVE', 'OVERDUE', 'NEGOTIATED', 'PAID_OFF', 'CANCELED']),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['HIGH', 'MEDIUM', 'LOW']),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateDebtDto.prototype, "notes", void 0);
class RegisterDebtPaymentDto {
    amount;
    paymentDate;
    installmentId;
    note;
}
exports.RegisterDebtPaymentDto = RegisterDebtPaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], RegisterDebtPaymentDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegisterDebtPaymentDto.prototype, "paymentDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], RegisterDebtPaymentDto.prototype, "installmentId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    __metadata("design:type", String)
], RegisterDebtPaymentDto.prototype, "note", void 0);
class ListDebtsQueryDto {
    status;
    type;
    priority;
}
exports.ListDebtsQueryDto = ListDebtsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ACTIVE', 'OVERDUE', 'NEGOTIATED', 'PAID_OFF', 'CANCELED']),
    __metadata("design:type", String)
], ListDebtsQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['CREDIT_CARD', 'LOAN', 'FINANCING', 'INSTALLMENT', 'PERSONAL', 'RENEGOTIATED', 'OTHER']),
    __metadata("design:type", String)
], ListDebtsQueryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['HIGH', 'MEDIUM', 'LOW']),
    __metadata("design:type", String)
], ListDebtsQueryDto.prototype, "priority", void 0);
//# sourceMappingURL=debts.dto.js.map