import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { CategoryKind } from '../../generated/prisma/client';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(40)
  name: string;

  @IsOptional()
  @IsIn(['INCOME', 'EXPENSE'])
  kind?: CategoryKind;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  icon?: string;

  @IsOptional()
  @IsString()
  @MaxLength(9)
  color?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  icon?: string;

  @IsOptional()
  @IsString()
  @MaxLength(9)
  color?: string;

  @IsOptional()
  @IsString()
  archived?: string;
}