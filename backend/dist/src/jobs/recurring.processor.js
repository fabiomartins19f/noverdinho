"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurringProcessor = exports.RECURRING_QUEUE = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const debts_service_1 = require("../debts/debts.service");
const insights_service_1 = require("../insights/insights.service");
const notifications_service_1 = require("../notifications/notifications.service");
const push_provider_1 = require("../notifications/push.provider");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
exports.RECURRING_QUEUE = 'noverdinho-recurring';
let RecurringProcessor = class RecurringProcessor extends bullmq_1.WorkerHost {
    prisma;
    debts;
    insights;
    notifications;
    push;
    logger = new common_1.Logger('RecurringProcessor');
    constructor(prisma, debts, insights, notifications, push) {
        super();
        this.prisma = prisma;
        this.debts = debts;
        this.insights = insights;
        this.notifications = notifications;
        this.push = push;
    }
    async process(job) {
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
    async dailyScan() {
        const now = (0, date_fns_1.startOfDay)(new Date());
        const horizon = (0, date_fns_1.addDays)(now, 3);
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
        const userIds = new Set();
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
                    createdAt: { gte: (0, date_fns_1.startOfDay)(new Date()) },
                },
            });
            if (exists)
                continue;
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
                type: client_1.NotificationType.DUE_SOON,
            });
        }
        this.logger.log(`daily-scan: ${created} notificações criadas`);
        return { created };
    }
    async monthlyCharges() {
        const result = await this.debts.accrueMonthlyCharges();
        this.logger.log(`monthly-charges: ${result.processed} dívidas com encargos apropriados`);
        return result;
    }
    async generateInsights() {
        const users = await this.prisma.user.findMany({ where: { status: 'ACTIVE' }, select: { id: true } });
        let count = 0;
        for (const user of users) {
            const insights = await this.insights.generate(user.id);
            count += insights.length;
        }
        this.logger.log(`generate-insights: ${count} insights para ${users.length} usuários`);
        return { users: users.length, insights: count };
    }
};
exports.RecurringProcessor = RecurringProcessor;
exports.RecurringProcessor = RecurringProcessor = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)(exports.RECURRING_QUEUE),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        debts_service_1.DebtsService,
        insights_service_1.InsightsService,
        notifications_service_1.NotificationsService,
        push_provider_1.PushProvider])
], RecurringProcessor);
//# sourceMappingURL=recurring.processor.js.map