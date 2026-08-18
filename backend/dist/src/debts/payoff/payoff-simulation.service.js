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
exports.PayoffSimulationService = void 0;
const common_1 = require("@nestjs/common");
const debt_priority_service_1 = require("./debt-priority.service");
const app_exception_1 = require("../../common/exceptions/app.exception");
const MAX_MONTHS = 480;
const CENT = 0.005;
let PayoffSimulationService = class PayoffSimulationService {
    priority;
    constructor(priority) {
        this.priority = priority;
    }
    simulate(input) {
        const { strategy, monthlyBudget } = input;
        if (monthlyBudget <= 0) {
            throw new app_exception_1.AppException('INVALID_AMOUNT', 'O valor mensal destinado às dívidas deve ser maior que zero.');
        }
        const active = input.debts.filter((d) => d.status !== 'PAID_OFF' && d.status !== 'CANCELED' && d.currentBalance > 0);
        if (active.length === 0) {
            throw new app_exception_1.AppException('NO_DEBTS_FOR_PLAN', 'Você não possui dívidas ativas para planejar.');
        }
        const ordered = this.priority.orderDebts(active, strategy);
        const orderById = new Map(ordered.map((o, i) => [o.debt.id, i]));
        const now = new Date();
        const states = active.map((debt) => ({
            id: debt.id,
            creditor: debt.creditor,
            balance: Math.round(debt.currentBalance * 100) / 100,
            annualRate: debt.annualRate,
            minimum: Math.min(debt.installmentAmount, debt.currentBalance),
            payoffMonth: null,
            amountPerMonth: 0,
        }));
        const plan = this.simulateMonths(states, ordered, monthlyBudget, false, MAX_MONTHS);
        const baseline = this.simulateMonths(states, ordered, monthlyBudget, true, plan.totalMonths);
        const paidItems = plan.order.filter((entry) => entry[1] !== null);
        const items = paidItems.map(([id, m, amount], i) => {
            const debt = active.find((d) => d.id === id);
            return {
                debtId: id,
                creditor: debt.creditor,
                order: orderById.get(id) + 1,
                payoffMonth: m,
                projectedPayoffDate: this.projectedDate(now, m),
                amountPerMonth: Math.round(amount * 100) / 100,
            };
        }).sort((a, b) => a.order - b.order);
        const payoffMonth = items.length ? Math.max(...items.map((i) => i.payoffMonth)) : 0;
        const estimatedInterest = Math.round(plan.totalInterest * 100) / 100;
        const baselineInterest = Math.round(baseline.totalInterest * 100) / 100;
        return {
            strategy,
            monthlyBudget,
            order: items,
            estimatedMonths: payoffMonth,
            estimatedInterest,
            estimatedTotal: Math.round((plan.totalPaid) * 100) / 100,
            baselineInterest,
            economy: Math.max(0, Math.round((baselineInterest - plan.totalInterest) * 100) / 100),
            projectedPayoffDate: payoffMonth ? this.projectedDate(now, payoffMonth) : '',
            feasible: plan.feasible,
        };
    }
    simulateMonths(initialStates, ordered, monthlyBudget, baselineOnly, maxMonths) {
        const states = initialStates.map((s) => ({ ...s }));
        const order = states.map((s) => [s.id, null, 0]);
        let totalInterest = 0;
        let totalPaid = 0;
        let feasible = true;
        let totalMonths = 0;
        const minimumSum = states.reduce((acc, s) => acc + s.minimum, 0);
        if (minimumSum > monthlyBudget + CENT)
            feasible = false;
        for (let month = 1; month <= maxMonths; month++) {
            totalMonths = month;
            for (const state of states) {
                if (state.balance <= 0)
                    continue;
                const monthlyRate = state.annualRate > 0 ? state.annualRate / 100 / 12 : 0;
                const interest = state.balance * monthlyRate;
                state.balance = state.balance + interest;
                totalInterest += interest;
            }
            let used = 0;
            for (const state of states) {
                if (state.balance <= 0)
                    continue;
                const payment = Math.min(state.minimum, state.balance, monthlyBudget - used);
                if (payment <= 0)
                    continue;
                state.balance = state.balance - payment;
                totalPaid += payment;
                used += payment;
            }
            if (baselineOnly) {
                if (states.every((s) => s.balance <= CENT))
                    break;
                continue;
            }
            for (const state of states) {
                if (state.balance <= CENT && state.payoffMonth === null) {
                    state.payoffMonth = month;
                    const idx = order.findIndex(([id]) => id === state.id);
                    order[idx] = [state.id, month, state.minimum];
                }
            }
            const extra = Math.max(0, monthlyBudget - used);
            if (extra > 0) {
                for (const { debt } of ordered) {
                    const state = states.find((s) => s.id === debt.id);
                    if (!state || state.balance <= CENT)
                        continue;
                    const payment = Math.min(extra, state.balance);
                    if (payment <= 0)
                        continue;
                    state.balance = state.balance - payment;
                    totalPaid += payment;
                    if (state.balance <= CENT) {
                        state.payoffMonth = month;
                        state.amountPerMonth = state.minimum + payment;
                        const idx = order.findIndex(([id]) => id === state.id);
                        order[idx] = [state.id, month, state.amountPerMonth];
                    }
                    break;
                }
            }
            if (states.every((s) => s.balance <= CENT))
                break;
        }
        return { totalInterest, totalPaid, order, feasible, totalMonths };
    }
    projectedDate(now, months) {
        const date = new Date(now.getFullYear(), now.getMonth() + months, 1);
        return date.toISOString().split('T')[0];
    }
};
exports.PayoffSimulationService = PayoffSimulationService;
exports.PayoffSimulationService = PayoffSimulationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [debt_priority_service_1.DebtPriorityService])
], PayoffSimulationService);
//# sourceMappingURL=payoff-simulation.service.js.map