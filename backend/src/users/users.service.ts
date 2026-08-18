import { Injectable, NotFoundException as NestNotFound } from '@nestjs/common';
import { Prisma, UserStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { roundMoney } from '../common/utils/money';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { name: string; email: string; passwordHash: string; phone?: string }) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        passwordHash: data.passwordHash,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const existing = await this.findById(id);
    if (!existing) throw new AppException('USER_NOT_FOUND', 'Usuário não encontrado.', 404);
    return this.prisma.user.update({ where: { id }, data });
  }

  async updatePassword(id: string, passwordHash: string) {
    return this.prisma.user.update({ where: { id }, data: { passwordHash } });
  }

  async revokeAllSessions(userId: string) {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({ where: { id } });
  }

  async getSummary(id: string) {
    const [user, accounts, debts, cards] = await Promise.all([
      this.findById(id),
      this.prisma.account.aggregate({
        where: { userId: id, isActive: true },
        _sum: { currentBalance: true },
      }),
      this.prisma.debt.aggregate({
        where: { userId: id, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] } },
        _sum: { currentBalance: true },
      }),
      this.prisma.creditCard.count({ where: { userId: id, isActive: true } }),
    ]);
    if (!user) throw new AppException('USER_NOT_FOUND', 'Usuário não encontrado.', 404);

    return {
      ...user,
      status: user.status as UserStatus,
      summary: {
        balance: roundMoney(accounts._sum.currentBalance ?? 0),
        totalDebt: roundMoney(debts._sum.currentBalance ?? 0),
        activeCards: cards,
      },
    };
  }
}
