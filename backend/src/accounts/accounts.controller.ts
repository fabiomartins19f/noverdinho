import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/accounts.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accounts: AccountsService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar contas do usuário' })
  list(@CurrentUser() user: AuthUser) {
    return this.accounts.list(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar conta' })
  async create(@CurrentUser() user: AuthUser, @Body() dto: CreateAccountDto) {
    const account = await this.accounts.create(user.id, dto);
    await this.audit.log(AuditAction.CREATE, { userId: user.id, entity: 'Account', entityId: account.id });
    return account;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe da conta' })
  get(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.accounts.getOwned(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar conta' })
  async update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateAccountDto) {
    const account = await this.accounts.update(user.id, id, dto);
    await this.audit.log(AuditAction.UPDATE, { userId: user.id, entity: 'Account', entityId: id });
    return account;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover conta (soft delete se houver histórico)' })
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const result = await this.accounts.delete(user.id, id);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'Account', entityId: id });
    return result;
  }
}