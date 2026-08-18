import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsNumber, Max, Min } from 'class-validator';
import { PayoffPlanService } from './payoff-plan.service';
import { CurrentUser, AuthUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

class PlanInputDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @Max(9_999_999)
  monthlyBudget: number;

  @IsIn(['AVALANCHE', 'SNOWBALL'])
  strategy: 'AVALANCHE' | 'SNOWBALL';
}

@ApiTags('debts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('debts/payoff-plan')
export class PayoffPlanController {
  constructor(private readonly payoff: PayoffPlanService) {}

  @Post('preview')
  @ApiOperation({ summary: 'Comparar estratégias sem persistir (Avalanche vs Bola de neve)' })
  preview(@CurrentUser() user: AuthUser, @Body() dto: PlanInputDto) {
    return this.payoff.preview(user.id, dto);
  }

  @Post()
  @ApiOperation({ summary: 'Criar plano de quitação (ordem de pagamento + projeções)' })
  create(@CurrentUser() user: AuthUser, @Body() dto: PlanInputDto) {
    return this.payoff.createPlan(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Histórico de planos' })
  list(@CurrentUser() user: AuthUser) {
    return this.payoff.listPlans(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe do plano com timeline de quitação' })
  get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.payoff.getPlan(user.id, id);
  }
}