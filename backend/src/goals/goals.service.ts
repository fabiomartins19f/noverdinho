import { Injectable } from '@nestjs/common';
import { addMonths, differenceInCalendarMonths, isBefore } from 'date-fns';
import { DebtPriority, Goal, GoalStatus, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AppException } from '../common/exceptions/app.exception';
import { money, roundMoney, toNumber } from '../common/utils/money';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string, status?: GoalStatus) {
    const goals = await this.prisma.goal.findMany({
      where: { userId, ...(status ? { status } : {}) },
      orderBy: [{ status: 'asc' }, { priority: 'desc' }],
    });
    return goals.map((goal) => this.decorate(goal));
  }

  async getOwned(userId: string, id: string) {
    const goal = await this.prisma.goal.findFirst({ where: { id, userId } });
    if (!goal) throw new AppException('GOAL_NOT_FOUND', 'Meta não encontrada.', 404);
    return goal;
  }

  async create(userId: string, dto: { name: string; emoji?: string; targetAmount: number; currentAmount?: number; targetDate?: string; priority?: string }) {
    const goal = await this.prisma.goal.create({
      data: {
        userId,
        name: dto.name,
        emoji: dto.emoji,
        targetAmount: money(dto.targetAmount),
        currentAmount: money(dto.currentAmount ?? 0),
        targetDate: dto.targetDate ? new Date(dto.targetDate) : null,
        priority: (dto.priority as DebtPriority) ?? 'MEDIUM',
      },
    });
    return this.decorate(goal);
  }

  async update(userId: string, id: string, dto: Prisma.GoalUpdateInput) {
    await this.getOwned(userId, id);
    const goal = await this.prisma.goal.update({ where: { id }, data: dto });
    return this.decorate(goal);
  }

  async remove(userId: string, id: string) {
    await this.getOwned(userId, id);
    await this.prisma.goal.delete({ where: { id } });
    return { deleted: true };
  }

  /**
   * Decorator com cálculos: percentual, valor restante, aporte mensal
   * necessário e previsão de conclusão.
   */
  private decorate(goal: Goal) {
    const target = money(goal.targetAmount);
    const current = money(goal.currentAmount);
    const remaining = target.minus(current).lt(0) ? money(0) : target.minus(current);
    const percent = target.isZero() ? 0 : Number(current.div(target).mul(100).toDecimalPlaces(1));

    let projectedDate: string | null = null;
    if (goal.targetDate && !isBefore(goal.targetDate, new Date())) {
      projectedDate = goal.targetDate.toISOString().split('T')[0];
    }

    // Previsão a partir do ritmo real dos últimos 90 dias de aportes via transações? 
    // Simplificação determinística: ritmo mínimo = remaining / meses até targetDate.
    const monthsToTarget = goal.targetDate
      ? Math.max(0, differenceInCalendarMonths(goal.targetDate, new Date()))
      : null;
    const monthlyContribution = monthsToTarget !== null && monthsToTarget > 0
      ? roundMoney(remaining.div(monthsToTarget))
      : null;

    return {
      ...goal,
      currentAmount: roundMoney(current),
      remainingAmount: roundMoney(remaining),
      percent,
      projectedCompletion: projectedDate,
      requiredMonthlyContribution: monthlyContribution ? toNumber(monthlyContribution) : null,
    };
  }
}