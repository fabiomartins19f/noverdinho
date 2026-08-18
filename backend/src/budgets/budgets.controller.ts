import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { BudgetsService } from './budgets.service';
import { UpsertBudgetDto } from './dto/budgets.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

class BudgetQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2020)
  @Max(2100)
  year?: number;
}

@ApiTags('budgets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetsController {
  constructor(
    private readonly budgets: BudgetsService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar orçamentos' })
  list(@CurrentUser() user: AuthUser, @Query() query: BudgetQueryDto) {
    return this.budgets.list(user.id, query.year);
  }

  @Get(':year/:month')
  @ApiOperation({ summary: 'Orçamento do mês com consumo real por categoria' })
  get(@CurrentUser() user: AuthUser, @Param('year') year: number, @Param('month') month: number) {
    return this.budgets.get(user.id, month, year);
  }

  @Post()
  @ApiOperation({ summary: 'Criar ou atualizar orçamento do mês' })
  async upsert(@CurrentUser() user: AuthUser, @Body() dto: UpsertBudgetDto) {
    const budget = await this.budgets.upsert(user.id, dto);
    await this.audit.log(AuditAction.UPDATE, {
      userId: user.id,
      entity: 'Budget',
      entityId: budget.id,
      metadata: { month: dto.month, year: dto.year },
    });
    return budget;
  }

  @Delete(':year/:month')
  @ApiOperation({ summary: 'Remover orçamento do mês' })
  async remove(@CurrentUser() user: AuthUser, @Param('year') year: number, @Param('month') month: number) {
    const result = await this.budgets.delete(user.id, month, year);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'Budget' });
    return result;
  }
}