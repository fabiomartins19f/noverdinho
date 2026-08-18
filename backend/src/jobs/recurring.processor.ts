import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { addDays, startOfDay } from 'date-fns';
import { DebtsService } from '../debts/debts.service';
import { InsightsService } from '../insights/insights.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PushProvider } from '../notifications/push.provider';
import { NotificationType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export const RECURRING_QUEUE = 'noverdinho-recurring';

@Injectable()
@Processor(RECURRING_QUEUE)
export class RecurringProcessor extends WorkerHost {
  private readonly logger = new Logger('RecurringProcessor');

  constructor(
    private readonly prisma: PrismaService,
    private readonly debts: DebtsService,
    private readonly insights: InsightsService,
    private readonly notifications: NotificationsService,
    private readonly push: PushProvider,
  ) {
    super();
  }

  async process(job: Job): Promise<unknown> {
    switch (job.name) {
      case 'daily-scan':
        return this.dailyScan();
      case 'monthly-charges':
        return this.monthlyCharges();
      case 'generate-insights':
        return this.generateInsights();
      default:
        this.logger.warn(`Job desconhecido: ${job.name}`);
        return { skipped: job.name };
    }
  }

  private async dailyScan() {
    const now = startOfDay(new Date());
    const horizon = addDays(now, 3);

    const [debtDue, cardDue, overdueDebts] = await Promise.all([
      this.prisma.debtInstallment.findMany({
        where: { status: 'PENDING', dueDate: { gte: now, lte: horizon } },
        include: { debt: { select: { creditor: true, userId: true } } },
      }),
      this.prisma.creditCardInstallment.findMany({
        where: { status: 'PENDING', dueDate: { gte: now, lte: horizon } },
        include: { card: { select: { name: true, userId: true } } },
      }),
      this.prisma.debt.findMany({ where: { status: 'OVERDUE' }, select: { id: true, userId: true, creditor: true } }),
    ]);

    let created = 0;
    const userIds = new Set<string>();

    for (const installment of debtDue) {
      const userId = installment.debt.userId;
      await this.notifications.create(userId, {
        type: 'DUE_SOON',
        title: 'Conta próxima do vencimento',
        body: `${installment.debt.creditor} vence em ${installment.dueDate.toLocaleDateString('pt-BR')}.`,
      });
      userIds.add(userId);
      created++;
    }

    for (const installment of cardDue) {
      const userId = installment.card.userId;
      await this.notifications.create(userId, {
        type: 'INVOICE_DUE',
        title: 'Fatura próxima',
        body: `A fatura de ${installment.card.name} vence em ${installment.dueDate.toLocaleDateString('pt-BR')}.`,
      });
      userIds.add(userId);
      created++;
    }

    for (const debt of overdueDebts) {
      const exists = await this.prisma.notification.findFirst({
        where: {
          userId: debt.userId,
          type: 'DEBT_OVERDUE',
          createdAt: { gte: startOfDay(new Date()) },
        },
      });
      if (exists) continue;
      await this.notifications.create(debt.userId, {
        type: 'DEBT_OVERDUE',
        title: 'Dívida atrasada',
        body: `${debt.creditor} está atrasada. Regularize para evitar juros e multas.`,
      });
      userIds.add(debt.userId);
      created++;
    }

    for (const userId of userIds) {
      await this.push.send({
        userId,
        title: 'No Verdinho',
        body: 'Você tem compromissos financeiros nos próximos dias.',
        type: NotificationType.DUE_SOON,
      });
    }

    this.logger.log(`daily-scan: ${created} notificações criadas`);
    return { created };
  }

  private async monthlyCharges() {
    const result = await this.debts.accrueMonthlyCharges();
    this.logger.log(`monthly-charges: ${result.processed} dívidas com encargos apropriados`);
    return result;
  }

  private async generateInsights() {
    const users = await this.prisma.user.findMany({ where: { status: 'ACTIVE' }, select: { id: true } });
    let count = 0;
    for (const user of users) {
      const insights = await this.insights.generate(user.id);
      count += insights.length;
    }
    this.logger.log(`generate-insights: ${count} insights para ${users.length} usuários`);
    return { users: users.length, insights: count };
  }
}