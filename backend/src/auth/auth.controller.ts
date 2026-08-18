import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from '../common/decorators/public.decorator';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';
import type { Request } from 'express';

const userAgent = (req: Request) => (req.headers['user-agent'] ?? undefined) as string | undefined;

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly audit: AuditService,
  ) {}

  @Public()
  @Post('register')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Criar conta' })
  async register(@Body() dto: RegisterDto, @Ip() ip: string, @Req() req: Request) {
    const result = await this.authService.register(dto, ip, userAgent(req));
    await this.audit.log(AuditAction.REGISTER, { userId: result.user.id, entity: 'User', entityId: result.user.id, ip });
    return result;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Login (JWT + Refresh Token)' })
  async login(@Body() dto: LoginDto, @Ip() ip: string, @Req() req: Request) {
    const result = await this.authService.login(dto, ip, userAgent(req));
    await this.audit.log(AuditAction.LOGIN, { userId: result.user.id, entity: 'User', entityId: result.user.id, ip });
    return result;
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @ApiOperation({ summary: 'Rotacionar refresh token e obter novo access token' })
  async refresh(@Body() dto: RefreshDto, @Ip() ip: string, @Req() req: Request) {
    return this.authService.refresh(dto.refreshToken, ip, userAgent(req));
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revogar sessão' })
  async logout(@Body() dto: RefreshDto) {
    return this.authService.logout(dto.refreshToken);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @ApiOperation({ summary: 'Solicitar redefinição de senha' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Redefinir senha com token' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password);
  }

  @Post('logout/all')
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Encerrar todas as sessões (revoga refresh tokens)' })
  async logoutAll(@CurrentUser() user: AuthUser, @Ip() ip: string) {
    await this.audit.log(AuditAction.LOGOUT, { userId: user.id, entity: 'Session', ip });
    return this.authService.logoutAll(user.id);
  }
}