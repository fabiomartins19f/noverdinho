import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CanISpendService } from './can-i-spend.service';
import { FinancialCapacityService } from './financial-capacity.service';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

class CanISpendDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(9_999_999)
  amount: number;
}

class CapacityInputDto {
  @IsNumber()
  @Min(0)
  monthlyIncome: number;

  @IsNumber()
  @Min(0)
  essentialExpenses: number;

  @IsNumber()
  @Min(0)
  mandatoryCommitments: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  safetyMarginPercent?: number;
}

@ApiTags('financial-analysis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('financial-analysis')
export class FinancialAnalysisController {
  constructor(
    private readonly canISpend: CanISpendService,
    private readonly capacity: FinancialCapacityService,
  ) {}

  @Post('can-i-spend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Posso gastar?',
    description: 'Analisa saldo, compromissos próximos, dívidas, faturas e orçamento. Retorna SAFE | CAUTION | NOT_RECOMMENDED.',
  })
  analyzeCanISpend(@CurrentUser() user: AuthUser, @Body() dto: CanISpendDto) {
    return this.canISpend.analyze(user.id, dto.amount);
  }

  @Post('capacity')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Capacidade de pagamento',
    description: 'Receitas - despesas essenciais - compromissos obrigatórios, com margem de segurança.',
  })
  computeCapacity(@CurrentUser() _user: AuthUser, @Body() dto: CapacityInputDto) {
    return this.capacity.compute(dto);
  }
}