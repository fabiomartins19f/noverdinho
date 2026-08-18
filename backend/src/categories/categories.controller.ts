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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { CurrentUser, AuthUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../generated/prisma/client';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categories: CategoriesService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Categorias padrão + personalizadas' })
  list(@CurrentUser() user: AuthUser) {
    return this.categories.list(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar categoria personalizada' })
  async create(@CurrentUser() user: AuthUser, @Body() dto: CreateCategoryDto) {
    const category = await this.categories.create(user.id, dto);
    await this.audit.log(AuditAction.CREATE, { userId: user.id, entity: 'Category', entityId: category.id });
    return category;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria' })
  async update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const category = await this.categories.update(user.id, id, dto);
    await this.audit.log(AuditAction.UPDATE, { userId: user.id, entity: 'Category', entityId: id });
    return category;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir ou arquivar categoria' })
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const result = await this.categories.delete(user.id, id);
    await this.audit.log(AuditAction.DELETE, { userId: user.id, entity: 'Category', entityId: id });
    return result;
  }
}