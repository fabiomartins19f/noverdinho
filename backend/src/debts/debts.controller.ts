import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DebtsService } from './debts.service';
import {
  CreateDebtDto,
  ListDebtsQueryDto,
  RegisterDebtPaymentDto,
  UpdateDebtDto,
} from './dto/debts.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

@ApiTags('debts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('debts')
export class DebtsController {
  constructor(
    private readonly debts: DebtsService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar dívidas (filtros: status, tipo, prioridade)' })
  list(@CurrentUser() user: AuthUser, @Query() query: ListDebtsQueryDto) {
    return this.debts.list(user.id, query);
  }

  @Get('overview')
  @ApiOperation({ summary: 'Resumo de dívidas (total, quitado, contagem por status)' })
  overview(@CurrentUser() user: AuthUser) {
    return this.debts.overview(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar dívida (gera cronograma de parcelas quando aplicável)' })
  async create(@CurrentUser() user: AuthUser, @Body() dto: CreateDebtDto) {
    const debt = await this.debts.create(user.id, dto);
    await this.audit.log(AuditAction.CREATE, {
      userId: user.id,
      entity: 'Debt',
      entityId: debt.id,
      metadata: { creditor: dto.creditor, amount: dto.originalAmount },
    });
    return debt;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe da dívida (parcelas + pagamentos + progresso)' })
  detail(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.debts.detail(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dívida' })
  async update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateDebtDto) {
    const debt = await this.debts.update(user.id, id, dto);
    await this.audit.log(AuditAction.UPDATE, { userId: user.id, entity: 'Debt', entityId: id });
    return debt;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar/remover dívida (soft delete quando há histórico)' })
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const result = await this.debts.remove(user.id, id);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'Debt', entityId: id });
    return result;
  }

  @Post(':id/payments')
  @ApiOperation({ summary: 'Registrar pagamento (aloca em parcelas: multa → juros → principal)' })
  async pay(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: RegisterDebtPaymentDto) {
    const result = await this.debts.registerPayment(user.id, id, dto);
    await this.audit.log(AuditAction.PAYMENT, {
      userId: user.id,
      entity: 'Debt',
      entityId: id,
      metadata: { amount: dto.amount },
    });
    return result;
  }
}