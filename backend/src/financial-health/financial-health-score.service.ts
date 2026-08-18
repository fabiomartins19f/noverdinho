import { Injectable } from '@nestjs/common';

/**
 * NÍVEL NO VERDINHO — indicador interno de organização financeira (0-100).
 *
 * IMPORTANTE: não é diagnóstico profissional nem garantia de saúde financeira.
 * É um score proprietário, documentado e testado, para orientar o usuário.
 *
 * Fatores e pesos:
 *  1. Comprometimento da renda   (30%)
 *  2. Carga de dívidas           (25%)
 *  3. Atrasos                    (15%)
 *  4. Utilização dos cartões     (10%)
 *  5. Capacidade de poupança     (10%)
 *  6. Cumprimento do orçamento   ( 5%)
 *  7. Reserva                    ( 5%)
 *
 * Faixas:
 *  0-29  Crítico
 *  30-49 Atenção
 *  50-69 Em evolução
 *  70-84 No caminho
 *  85-100 Excelente
 */

export interface HealthScoreMetrics {
  commitmentRatio: number; // % da renda comprometida (essenciais + mínimos de dívida)
  income: number;
  totalDebt: number;
  overdueDebtCount: number;
  overdueCardInstallmentCount: number;
  cardUtilization: number; // % média do limite utilizado
  savingsRate: number; // % da renda poupada
  budgetCategoriesOver: number; // categorias do orçamento estouradas
  budgetCategoriesTotal: number;
  reserveMonths: number; // meses de reserva (saldo / despesas essenciais)
}

export interface HealthScoreResult {
  score: number; // 0-100
  band: 'CRITICAL' | 'ATTENTION' | 'EVOLVING' | 'ON_TRACK' | 'EXCELLENT';
  bandLabel: string;
  message: string;
  breakdown: Array<{ factor: string; weight: number; value: number }>;
}

export type ScoreBand = HealthScoreResult['band'];

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));

@Injectable()
export class FinancialHealthScoreService {
  compute(m: HealthScoreMetrics): HealthScoreResult {
    const w = {
      commitment: 0.3,
      debt: 0.25,
      delinquency: 0.15,
      card: 0.1,
      savings: 0.1,
      budget: 0.05,
      reserve: 0.05,
    };

    // 1. Comprometimento: quanto menor a proporção comprometida, melhor.
    const commitment = clamp(100 - m.commitmentRatio);

    // 2. Carga de dívidas: 100 quando zero; penaliza conforme dívida / renda anual.
    const annualDebtLoad = m.income > 0 ? m.totalDebt / (m.income * 12) : 0;
    const debt = clamp(100 - annualDebtLoad * 100);

    // 3. Atrasos: cada dívida atrasada custa 25; parcelas de cartão atrasadas custam 10 cada.
    const delinquency = clamp(100 - m.overdueDebtCount * 25 - m.overdueCardInstallmentCount * 10);

    // 4. Cartões: utilização média direta.
    const card = clamp(100 - m.cardUtilization);

    // 5. Poupança: percentual da renda poupada.
    const savings = clamp(m.savingsRate * 100);

    // 6. Orçamento: proporção de categorias dentro do limite.
    const budget =
      m.budgetCategoriesTotal > 0
        ? clamp((1 - m.budgetCategoriesOver / m.budgetCategoriesTotal) * 100)
        : 100;

    // 7. Reserva: 4 meses de despesas essenciais = 100.
    const reserve = clamp(m.reserveMonths * 25);

    const score = Math.round(
      commitment * w.commitment +
        debt * w.debt +
        delinquency * w.delinquency +
        card * w.card +
        savings * w.savings +
        budget * w.budget +
        reserve * w.reserve,
    );

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

  private bandFor(score: number): { label: ScoreBand; message: string } {
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
}