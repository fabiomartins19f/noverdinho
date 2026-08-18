import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { FinancialHealthService } from './financial-health.service';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

class EvolutionQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2)
  @Max(24)
  months?: number;
}

@ApiTags('financial-health')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('financial-health')
export class FinancialHealthController {
  constructor(private readonly health: FinancialHealthService) {}

  @Get('score')
  @ApiOperation({
    summary: 'Nível No Verdinho (0-100)',
    description: 'Indicador interno de organização financeira, com evolução dos últimos 6 meses.',
  })
  score(@CurrentUser() user: AuthUser) {
    return this.health.currentScore(user.id);
  }

  @Get('evolution')
  @ApiOperation({ summary: 'Evolução mensal do score' })
  evolution(@CurrentUser() user: AuthUser, @Query() query: EvolutionQueryDto) {
    return this.health.evolution(user.id, query.months ?? 6);
  }
}