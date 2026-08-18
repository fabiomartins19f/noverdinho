import { Injectable } from '@nestjs/common';
import { PlanStrategy, Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AppException } from '../../common/exceptions/app.exception';
import { roundMoney, toNumber } from '../../common/utils/money';
import { PayoffSimulationService } from './payoff-simulation.service';
import { DebtPriorityInput } from './debt-priority.service';
import { DebtsService } from '../debts.service';

@Injectable()
export class PayoffPlanService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly simulation: PayoffSimulationService,
    private readonly debts: DebtsService,
  ) {}

  /**
   * Cria o plano de quitação a partir das dívidas ativas do usuário.
   * O resultado é persistido e determinístico.
   */
  async createPlan(userId: string, dto: { monthlyBudget: number; strategy: PlanStrategy }) {
    const debts = await this.prisma.debt.findMany({
      where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] }, currentBalance: { gt: 0 } },
    });

    const inputs: (DebtPriorityInput & { type: string; dueDate: string })[] = debts.map((debt) => ({
      id: debt.id,
      creditor: debt.creditor,
      currentBalance: toNumber(debt.currentBalance),
      annualRate: toNumber(debt.interestRate) * (debt.interestType === 'MONTHLY' ? 12 : 1),
      installmentAmount: Math.max(toNumber(debt.installmentAmount ?? 0), 0),
      totalInstallments: debt.totalInstallments,
      paidInstallments: debt.paidInstallments,
      status: debt.status as DebtPriorityInput['status'],
      type: debt.type as string,
      dueDate: debt.dueDate.toISOString(),
    }));

    const result = this.simulation.simulate({
      debts: inputs,
      monthlyBudget: dto.monthlyBudget,
      strategy: dto.strategy,
    });

    if (!result.feasible) {
      throw new AppException(
        'BUDGET_BELOW_MINIMUM',
        'O valor mensal informado é menor que a soma das parcelas mínimas das suas dívidas.',
      );
    }

    const plan = await this.prisma.debtPayoffPlan.create({
      data: {
        userId,
        strategy: dto.strategy,
        monthlyBudget: roundMoney(dto.monthlyBudget),
        estimatedMonths: result.estimatedMonths,
        estimatedInterest: result.estimatedInterest,
        estimatedTotal: result.estimatedTotal,
        baselineInterest: result.baselineInterest,
        projectedPayoffDate: result.projectedPayoffDate ? new Date(result.projectedPayoffDate) : null,
      },
    });

    await this.prisma.debtPayoffPlanItem.createMany({
      data: result.order.map((item) => ({
        planId: plan.id,
        debtId: item.debtId,
        order: item.order,
        payoffMonth: item.payoffMonth,
        projectedPayoffDate: new Date(item.projectedPayoffDate),
        amountPerMonth: roundMoney(item.amountPerMonth),
      })),
    });

    return {
      plan,
      items: result.order,
      economy: result.economy,
      baselineInterest: result.baselineInterest,
      feasible: true,
    };
  }

  async listPlans(userId: string) {
    return this.prisma.debtPayoffPlan.findMany({
      where: { userId },
      include: { items: { include: { debt: true }, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async getPlan(userId: string, planId: string) {
    const plan = await this.prisma.debtPayoffPlan.findFirst({
      where: { id: planId, userId },
      include: { items: { include: { debt: true }, orderBy: { order: 'asc' } } },
    });
    if (!plan) throw new AppException('DEBT_NOT_FOUND', 'Plano de quitação não encontrado.', 404);
    return plan;
  }

  /** Prévia sem persistir (para o app comparar estratégias antes de escolher). */
  async preview(userId: string, dto: { monthlyBudget: number; strategy: PlanStrategy }) {
    const debts = await this.prisma.debt.findMany({
      where: { userId, status: { in: ['ACTIVE', 'OVERDUE', 'NEGOTIATED'] }, currentBalance: { gt: 0 } },
    });
    const inputs = debts.map((debt) => ({
      id: debt.id,
      creditor: debt.creditor,
      currentBalance: toNumber(debt.currentBalance),
      annualRate: toNumber(debt.interestRate) * (debt.interestType === 'MONTHLY' ? 12 : 1),
      installmentAmount: Math.max(toNumber(debt.installmentAmount ?? 0), 0),
      totalInstallments: debt.totalInstallments,
      paidInstallments: debt.paidInstallments,
      status: debt.status as DebtPriorityInput['status'],
      type: debt.type as string,
      dueDate: debt.dueDate.toISOString(),
    }));
    return this.simulation.simulate({ debts: inputs, monthlyBudget: dto.monthlyBudget, strategy: dto.strategy });
  }
}