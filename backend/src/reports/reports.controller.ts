import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { ReportPeriodDto } from './dto/reports.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Resumo do período (receitas, despesas, dívidas, economia)' })
  summary(@CurrentUser() user: AuthUser, @Query() query: ReportPeriodDto) {
    return this.reports.summary(user.id, query.from, query.to);
  }

  @Get('income-expense')
  @ApiOperation({ summary: 'Série mensal de receitas x despesas (gráfico de linhas)' })
  incomeExpense(@CurrentUser() user: AuthUser, @Query() query: ReportPeriodDto) {
    return this.reports.incomeExpenseSeries(user.id, query.from, query.to);
  }

  @Get('expenses-by-category')
  @ApiOperation({ summary: 'Gastos por categoria no período' })
  expensesByCategory(@CurrentUser() user: AuthUser, @Query() query: ReportPeriodDto) {
    return this.reports.expensesByCategory(user.id, query.from, query.to);
  }
}