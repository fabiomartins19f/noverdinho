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
import { CreditCardsService } from './credit-cards.service';
import {
  CreateCardDto,
  CreatePurchaseDto,
  InvoiceQueryDto,
  UpdateCardDto,
} from './dto/credit-cards.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

@ApiTags('credit-cards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CreditCardsController {
  constructor(
    private readonly cards: CreditCardsService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar cartões com utilização do limite' })
  list(@CurrentUser() user: AuthUser) {
    return this.cards.list(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar cartão' })
  async create(@CurrentUser() user: AuthUser, @Body() dto: CreateCardDto) {
    const card = await this.cards.create(user.id, dto);
    await this.audit.log(AuditAction.CREATE, { userId: user.id, entity: 'CreditCard', entityId: card.id });
    return card;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe do cartão' })
  async get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const card = await this.cards.getOwned(user.id, id);
    return this.cards.withUtilization(user.id, card);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar cartão' })
  async update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateCardDto) {
    const card = await this.cards.update(user.id, id, dto);
    await this.audit.log(AuditAction.UPDATE, { userId: user.id, entity: 'CreditCard', entityId: id });
    return card;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cartão (soft delete se houver parcelas pendentes)' })
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const result = await this.cards.remove(user.id, id);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'CreditCard', entityId: id });
    return result;
  }

  @Post(':id/purchases')
  @ApiOperation({ summary: 'Registrar compra (gera parcelas e distribui nas faturas)' })
  async createPurchase(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: CreatePurchaseDto) {
    const purchase = await this.cards.createPurchase(user.id, id, dto);
    await this.audit.log(AuditAction.CREATE, { userId: user.id, entity: 'CreditCardPurchase', entityId: purchase.id });
    return purchase;
  }

  @Get(':id/purchases')
  @ApiOperation({ summary: 'Compras do cartão com parcelas' })
  purchases(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.cards.listPurchases(user.id, id);
  }

  @Get(':id/invoices')
  @ApiOperation({ summary: 'Faturas do cartão (atual + histórico)' })
  invoices(@CurrentUser() user: AuthUser, @Param('id') id: string, @Query() query: InvoiceQueryDto) {
    return this.cards.listInvoices(user.id, id, 12);
  }

  @Get(':id/invoices/current')
  @ApiOperation({ summary: 'Fatura atual (próxima a vencer)' })
  currentInvoice(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.cards.currentInvoice(user.id, id);
  }

  @Get('invoices/:invoiceId')
  @ApiOperation({ summary: 'Detalhe de uma fatura' })
  invoiceDetail(@CurrentUser() user: AuthUser, @Param('invoiceId') invoiceId: string) {
    return this.cards.invoiceDetail(user.id, invoiceId);
  }

  @Post('invoices/:invoiceId/pay')
  @ApiOperation({ summary: 'Marcar fatura como paga (baixa parcelas da fatura)' })
  async payInvoice(@CurrentUser() user: AuthUser, @Param('invoiceId') invoiceId: string) {
    const invoice = await this.cards.payInvoice(user.id, invoiceId);
    await this.audit.log(AuditAction.PAYMENT, { userId: user.id, entity: 'CreditCardInvoice', entityId: invoiceId });
    return invoice;
  }
}