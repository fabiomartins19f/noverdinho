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
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { NotificationsService } from './notifications.service';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

class RegisterDeviceDto {
  @IsString()
  @MaxLength(400)
  token: string;

  @IsOptional()
  @IsString()
  platform?: string;

  @IsOptional()
  @IsString()
  apnsTopic?: string;
}

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar notificações' })
  list(
    @CurrentUser() user: AuthUser,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
  ) {
    return this.notifications.list(user.id, Number(page) || 1, Number(perPage) || 20);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marcar como lida' })
  markRead(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.notifications.markRead(user.id, id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Marcar todas como lidas' })
  markAllRead(@CurrentUser() user: AuthUser) {
    return this.notifications.markAllRead(user.id);
  }

  @Post('devices')
  @ApiOperation({ summary: 'Registrar dispositivo para push (APNs)' })
  registerDevice(@CurrentUser() user: AuthUser, @Body() dto: RegisterDeviceDto) {
    return this.notifications.registerDevice(user.id, dto);
  }

  @Delete('devices/:token')
  @ApiOperation({ summary: 'Remover dispositivo' })
  unregisterDevice(@CurrentUser() user: AuthUser, @Param('token') token: string) {
    return this.notifications.unregisterDevice(user.id, token);
  }
}