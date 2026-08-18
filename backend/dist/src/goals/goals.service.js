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
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const app_exception_1 = require("../common/exceptions/app.exception");
const money_1 = require("../common/utils/money");
let GoalsService = class GoalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(userId, status) {
        const goals = await this.prisma.goal.findMany({
            where: { userId, ...(status ? { status } : {}) },
            orderBy: [{ status: 'asc' }, { priority: 'desc' }],
        });
        return goals.map((goal) => this.decorate(goal));
    }
    async getOwned(userId, id) {
        const goal = await this.prisma.goal.findFirst({ where: { id, userId } });
        if (!goal)
            throw new app_exception_1.AppException('GOAL_NOT_FOUND', 'Meta não encontrada.', 404);
        return goal;
    }
    async create(userId, dto) {
        const goal = await this.prisma.goal.create({
            data: {
                userId,
                name: dto.name,
                emoji: dto.emoji,
                targetAmount: (0, money_1.money)(dto.targetAmount),
                currentAmount: (0, money_1.money)(dto.currentAmount ?? 0),
                targetDate: dto.targetDate ? new Date(dto.targetDate) : null,
                priority: dto.priority ?? 'MEDIUM',
            },
        });
        return this.decorate(goal);
    }
    async update(userId, id, dto) {
        await this.getOwned(userId, id);
        const goal = await this.prisma.goal.update({ where: { id }, data: dto });
        return this.decorate(goal);
    }
    async remove(userId, id) {
        await this.getOwned(userId, id);
        await this.prisma.goal.delete({ where: { id } });
        return { deleted: true };
    }
    decorate(goal) {
        const target = (0, money_1.money)(goal.targetAmount);
        const current = (0, money_1.money)(goal.currentAmount);
        const remaining = target.minus(current).lt(0) ? (0, money_1.money)(0) : target.minus(current);
        const percent = target.isZero() ? 0 : Number(current.div(target).mul(100).toDecimalPlaces(1));
        let projectedDate = null;
        if (goal.targetDate && !(0, date_fns_1.isBefore)(goal.targetDate, new Date())) {
            projectedDate = goal.targetDate.toISOString().split('T')[0];
        }
        const monthsToTarget = goal.targetDate
            ? Math.max(0, (0, date_fns_1.differenceInCalendarMonths)(goal.targetDate, new Date()))
            : null;
        const monthlyContribution = monthsToTarget !== null && monthsToTarget > 0
            ? (0, money_1.roundMoney)(remaining.div(monthsToTarget))
            : null;
        return {
            ...goal,
            currentAmount: (0, money_1.roundMoney)(current),
            remainingAmount: (0, money_1.roundMoney)(remaining),
            percent,
            projectedCompletion: projectedDate,
            requiredMonthlyContribution: monthlyContribution ? (0, money_1.toNumber)(monthlyContribution) : null,
        };
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GoalsService);
//# sourceMappingURL=goals.service.js.map