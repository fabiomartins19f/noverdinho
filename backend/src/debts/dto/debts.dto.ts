import {
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateDebtDto {
  @IsString()
  @MaxLength(120)
  creditor: string;

  @IsIn(['CREDIT_CARD', 'LOAN', 'FINANCING', 'INSTALLMENT', 'PERSONAL', 'RENEGOTIATED', 'OTHER'])
  type: 'CREDIT_CARD' | 'LOAN' | 'FINANCING' | 'INSTALLMENT' | 'PERSONAL' | 'RENEGOTIATED' | 'OTHER';

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  originalAmount: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  currentBalance?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(1000)
  interestRate?: number;

  @IsOptional()
  @IsIn(['MONTHLY', 'ANNUAL', 'FIXED'])
  interestType?: 'MONTHLY' | 'ANNUAL' | 'FIXED';

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(1000)
  penaltyRate?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  installmentAmount?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(600)
  totalInstallments?: number;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsIn(['ACTIVE', 'OVERDUE', 'NEGOTIATED'])
  status?: 'ACTIVE' | 'OVERDUE' | 'NEGOTIATED';

  @IsOptional()
  @IsIn(['HIGH', 'MEDIUM', 'LOW'])
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

export class UpdateDebtDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  creditor?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(1000)
  interestRate?: number;

  @IsOptional()
  @IsIn(['MONTHLY', 'ANNUAL', 'FIXED'])
  interestType?: 'MONTHLY' | 'ANNUAL' | 'FIXED';

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  @Max(1000)
  penaltyRate?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  installmentAmount?: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsIn(['ACTIVE', 'OVERDUE', 'NEGOTIATED', 'PAID_OFF', 'CANCELED'])
  status?: 'ACTIVE' | 'OVERDUE' | 'NEGOTIATED' | 'PAID_OFF' | 'CANCELED';

  @IsOptional()
  @IsIn(['HIGH', 'MEDIUM', 'LOW'])
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

export class RegisterDebtPaymentDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @IsOptional()
  @IsUUID()
  installmentId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  note?: string;
}

export class ListDebtsQueryDto {
  @IsOptional()
  @IsIn(['ACTIVE', 'OVERDUE', 'NEGOTIATED', 'PAID_OFF', 'CANCELED'])
  status?: string;

  @IsOptional()
  @IsIn(['CREDIT_CARD', 'LOAN', 'FINANCING', 'INSTALLMENT', 'PERSONAL', 'RENEGOTIATED', 'OTHER'])
  type?: string;

  @IsOptional()
  @IsIn(['HIGH', 'MEDIUM', 'LOW'])
  priority?: string;
}