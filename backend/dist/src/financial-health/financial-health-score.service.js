"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialHealthScoreService = void 0;
const common_1 = require("@nestjs/common");
const clamp = (v, min = 0, max = 100) => Math.min(max, Math.max(min, v));
let FinancialHealthScoreService = class FinancialHealthScoreService {
    compute(m) {
        const w = {
            commitment: 0.3,
            debt: 0.25,
            delinquency: 0.15,
            card: 0.1,
            savings: 0.1,
            budget: 0.05,
            reserve: 0.05,
        };
        const commitment = clamp(100 - m.commitmentRatio);
        const annualDebtLoad = m.income > 0 ? m.totalDebt / (m.income * 12) : 0;
        const debt = clamp(100 - annualDebtLoad * 100);
        const delinquency = clamp(100 - m.overdueDebtCount * 25 - m.overdueCardInstallmentCount * 10);
        const card = clamp(100 - m.cardUtilization);
        const savings = clamp(m.savingsRate * 100);
        const budget = m.budgetCategoriesTotal > 0
            ? clamp((1 - m.budgetCategoriesOver / m.budgetCategoriesTotal) * 100)
            : 100;
        const reserve = clamp(m.reserveMonths * 25);
        const score = Math.round(commitment * w.commitment +
            debt * w.debt +
            delinquency * w.delinquency +
            card * w.card +
            savings * w.savings +
            budget * w.budget +
            reserve * w.reserve);
        const band = this.bandFor(score);
        return {
            score,
            band: band.label,
            bandLabel: band.label,
            message: band.message,
            breakdown: [
                { factor: 'Comprometimento da renda', weight: w.commitment, value: Math.round(commitment) },
                { factor: 'Carga de dívidas', weight: w.debt, value: Math.round(debt) },
                { factor: 'Atrasos', weight: w.delinquency, value: Math.round(delinquency) },
                { factor: 'Utilização dos cartões', weight: w.card, value: Math.round(card) },
                { factor: 'Capacidade de poupança', weight: w.savings, value: Math.round(savings) },
                { factor: 'Cumprimento do orçamento', weight: w.budget, value: Math.round(budget) },
                { factor: 'Reserva', weight: w.reserve, value: Math.round(reserve) },
            ],
        };
    }
    bandFor(score) {
        if (score <= 29) {
            return {
                label: 'CRITICAL',
                message: 'Sua organização financeira está em nível crítico. Comece organizando suas dívidas.',
            };
        }
        if (score <= 49) {
            return {
                label: 'ATTENTION',
                message: 'Há pontos importantes para corrigir. O plano de quitação pode ajudar.',
            };
        }
        if (score <= 69) {
            return {
                label: 'EVOLVING',
                message: 'Você está evoluindo, mas ainda existem pontos para melhorar.',
            };
        }
        if (score <= 84) {
            return {
                label: 'ON_TRACK',
                message: 'Você está no caminho certo. Continue assim para chegar no verdinho.',
            };
        }
        return {
            label: 'EXCELLENT',
            message: 'Excelente! Sua organização financeira está no verdinho.',
        };
    }
};
exports.FinancialHealthScoreService = FinancialHealthScoreService;
exports.FinancialHealthScoreService = FinancialHealthScoreService = __decorate([
    (0, common_1.Injectable)()
], FinancialHealthScoreService);
//# sourceMappingURL=financial-health-score.service.js.map