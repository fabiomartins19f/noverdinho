import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import {
  CreateTransactionDto,
  ListTransactionsQueryDto,
  UpdateTransactionDto,
} from './dto/transactions.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactions: TransactionsService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar movimentações (filtros por tipo, período, conta, categoria)' })
  list(@CurrentUser() user: AuthUser, @Query() query: ListTransactionsQueryDto) {
    return this.transactions.list(user.id, query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar movimentação. Suporta header Idempotency-Key para evitar duplicação.' })
  async create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateTransactionDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    const result = await this.transactions.create({
      userId: user.id,
      accountId: dto.accountId,
      transferAccountId: dto.transferAccountId,
      categoryId: dto.categoryId,
      type: dto.type,
      amount: dto.amount,
      description: dto.description,
      transactionDate: dto.transactionDate ? new Date(dto.transactionDate) : undefined,
      recurring: dto.recurring,
      recurrenceRule: dto.recurrenceRule,
      idempotencyKey,
    });
    if (!result.duplicated) {
      await this.audit.log(AuditAction.CREATE, {
        userId: user.id,
        entity: 'Transaction',
        entityId: result.transaction.id,
        metadata: { type: dto.type, amount: dto.amount },
      });
    }
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe da movimentação' })
  get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.transactions.getOwned(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar descrição, categoria, data ou status' })
  async update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    const updated = await this.transactions.update(user.id, id, dto);
    await this.audit.log(AuditAction.UPDATE, { userId: user.id, entity: 'Transaction', entityId: id });
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar movimentação (reverte saldo, soft delete)' })
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const canceled = await this.transactions.cancel(user.id, id);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'Transaction', entityId: id });
    return canceled;
  }
}