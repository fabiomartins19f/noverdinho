import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Categorias padrão do sistema (userId null) + categorias personalizadas do usuário. */
  async list(userId: string) {
    return this.prisma.category.findMany({
      where: { archived: false, OR: [{ userId: null }, { userId }] },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    });
  }

  async create(userId: string, dto: { name: string; kind?: string; icon?: string; color?: string }) {
    return this.prisma.category.create({
      data: { userId, name: dto.name, kind: (dto.kind as 'INCOME' | 'EXPENSE') ?? 'EXPENSE', icon: dto.icon, color: dto.color },
    });
  }

  async getOwned(userId: string, id: string) {
    const category = await this.prisma.category.findFirst({ where: { id, userId } });
    if (!category) throw new AppException('CATEGORY_NOT_FOUND', 'Categoria não encontrada.', 404);
    return category;
  }

  async update(userId: string, id: string, dto: { name?: string; icon?: string; color?: string }) {
    await this.getOwned(userId, id);
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  /**
   * Estratégia segura de exclusão: categorias com movimentações são arquivadas.
   * Se a categoria não tem movimentações, é removida fisicamente.
   */
  async delete(userId: string, id: string) {
    await this.getOwned(userId, id);
    const usage = await this.prisma.transaction.count({ where: { categoryId: id } });
    if (usage > 0) {
      await this.prisma.category.update({ where: { id }, data: { archived: true } });
      return { archived: true, message: 'Categoria arquivada por possuir movimentações.' };
    }
    await this.prisma.category.delete({ where: { id } });
    return { deleted: true };
  }
}