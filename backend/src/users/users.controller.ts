import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AppException } from '../common/exceptions/app.exception';
import type { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly audit: AuditService,
  ) {}

  @Get('me')
  @ApiOperation({ summary: 'Dados do usuário autenticado + resumo financeiro' })
  me(@CurrentUser() user: AuthUser) {
    return this.usersService.getSummary(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Atualizar perfil' })
  async update(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto, @Req() req: Request) {
    const emailInUse = dto.email
      ? await this.usersService.findByEmail(dto.email.toLowerCase())
      : null;
    if (emailInUse && emailInUse.id !== user.id) {
      throw new AppException('EMAIL_ALREADY_REGISTERED', 'E-mail já cadastrado.');
    }
    const updated = await this.usersService.update(user.id, { ...dto });
    await this.audit.log(AuditAction.UPDATE, {
      userId: user.id,
      entity: 'User',
      entityId: user.id,
      ip: req.ip,
    });
    return updated;
  }

  @Delete('me')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir conta (LGPD) — apaga dados pessoais' })
  async deleteAccount(@CurrentUser() user: AuthUser, @Req() req: Request) {
    await this.audit.log(AuditAction.DELETE, {
      userId: user.id,
      entity: 'User',
      entityId: user.id,
      ip: req.ip,
    });
    await this.usersService.deleteUser(user.id);
  }
}
