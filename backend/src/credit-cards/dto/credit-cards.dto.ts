import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  institution?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  limit: number;

  @IsInt()
  @Min(1)
  @Max(28)
  closingDay: number;

  @IsInt()
  @Min(1)
  @Max(28)
  dueDay: number;
}

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  institution?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(28)
  closingDay?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(28)
  dueDay?: number;

  @IsOptional()
  isActive?: boolean;
}

export class CreatePurchaseDto {
  @IsString()
  @MaxLength(160)
  description: string;

  /** Valor TOTAL da compra (parcelada ou não). */
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;

  @IsInt()
  @Min(1)
  @Max(48)
  installments: number = 1;
}

export class InvoiceQueryDto {
  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;
}