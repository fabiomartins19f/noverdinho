import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { AccountType } from '../../generated/prisma/client';

export class CreateAccountDto {
  @IsString()
  @MaxLength(60)
  name: string;

  @IsOptional()
  @IsIn(['CHECKING', 'SAVINGS', 'WALLET', 'DIGITAL', 'INVESTMENT', 'CASH', 'OTHER'])
  type?: AccountType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  initialBalance: number = 0;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  institution?: string;
}

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsIn(['CHECKING', 'SAVINGS', 'WALLET', 'DIGITAL', 'INVESTMENT', 'CASH', 'OTHER'])
  type?: AccountType;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  institution?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}