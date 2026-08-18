import { IsArray, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BudgetCategoryInputDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsString()
  @MaxLength(40)
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  limit: number;
}

export class UpsertBudgetDto {
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  @Min(2020)
  @Max(2100)
  year: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  totalLimit: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetCategoryInputDto)
  categories: BudgetCategoryInputDto[];
}