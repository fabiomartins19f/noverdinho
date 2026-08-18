import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  accountId: string;

  @IsOptional()
  @IsUUID()
  transferAccountId?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsIn(['INCOME', 'EXPENSE', 'TRANSFER', 'ADJUSTMENT'])
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'ADJUSTMENT';

  /** Para ADJUSTMENT pode ser negativo (correção). Nos demais tipos, sempre positivo. */
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(-999_999_999_999)
  @Max(999_999_999_999)
  amount: number;

  @IsString()
  @MaxLength(160)
  description: string;

  @IsOptional()
  @IsDateString()
  transactionDate?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  recurring?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  recurrenceRule?: string;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  @MaxLength(160)
  description?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsDateString()
  transactionDate?: string;

  @IsOptional()
  @IsIn(['PENDING', 'CONFIRMED', 'CANCELED'])
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELED';
}

export class ListTransactionsQueryDto {
  @IsOptional()
  @IsIn(['INCOME', 'EXPENSE', 'TRANSFER', 'ADJUSTMENT'])
  type?: string;

  @IsOptional()
  @IsUUID()
  accountId?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  perPage?: number;
}