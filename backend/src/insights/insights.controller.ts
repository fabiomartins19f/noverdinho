import { Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InsightsService } from './insights.service';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('insights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('insights')
export class InsightsController {
  constructor(private readonly insights: InsightsService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Gerar recomendações financeiras (regras determinísticas)',
    description: 'Analisa o comportamento e persiste cards inteligentes acionáveis.',
  })
  generate(@CurrentUser() user: AuthUser) {
    return this.insights.generate(user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar recomendações' })
  list(@CurrentUser() user: AuthUser, @Query('unread') unread?: string) {
    return this.insights.list(user.id, unread === 'true');
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marcar recomendação como lida' })
  markRead(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.insights.markRead(user.id, id);
  }
}