import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goals.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

@ApiTags('goals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(
    private readonly goals: GoalsService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar metas com percentual e previsão' })
  list(@CurrentUser() user: AuthUser, @Query('status') status?: string) {
    return this.goals.list(user.id, status as 'ACTIVE' | 'COMPLETED' | 'PAUSED' | undefined);
  }

  @Post()
  @ApiOperation({ summary: 'Criar meta' })
  async create(@CurrentUser() user: AuthUser, @Body() dto: CreateGoalDto) {
    const goal = await this.goals.create(user.id, dto);
    await this.audit.log(AuditAction.CREATE, { userId: user.id, entity: 'Goal', entityId: goal.id });
    return goal;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar meta' })
  async update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateGoalDto) {
    const goal = await this.goals.update(user.id, id, dto);
    await this.audit.log(AuditAction.UPDATE, { userId: user.id, entity: 'Goal', entityId: id });
    return goal;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover meta' })
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const result = await this.goals.remove(user.id, id);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'Goal', entityId: id });
    return result;
  }
}