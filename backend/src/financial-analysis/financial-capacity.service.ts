import { Injectable } from '@nestjs/common';

export interface CapacityInput {
  monthlyIncome: number; // receitas recorrentes
  essentialExpenses: number; // despesas essenciais mensais
  mandatoryCommitments: number; // dívidas + faturas + parcelamentos (mínimos mensais)
  safetyMarginPercent?: number; // margem de segurança configurável (default 20%)
}

export interface CapacityResult {
  availableCapacity: number;
  maxDebtPayment: number;
  marginOfSafety: number;
  commitmentRatio: number; // 0-100
  freeCash: number;
}

/**
 * Capacidade financeira disponível:
 *   Capacidade = Receitas - Despesas essenciais - Compromissos obrigatórios
 *
 * Regras:
 * - Nunca recomendar comprometer 100% do dinheiro disponível.
 * - Margem de segurança configurável (default 20%) é preservada.
 */
@Injectable()
export class FinancialCapacityService {
  compute(input: CapacityInput): CapacityResult {
    const income = Math.max(0, input.monthlyIncome);
    const essentials = Math.max(0, input.essentialExpenses);
    const commitments = Math.max(0, input.mandatoryCommitments);
    const safety = Math.min(0.5, Math.max(0, input.safetyMarginPercent ?? 0.2));

    const freeCash = income - essentials - commitments;
    const marginOfSafety = Math.max(0, freeCash * safety);
    const maxDebtPayment = Math.max(0, freeCash - marginOfSafety);
    const commitmentRatio = income > 0 ? ((essentials + commitments) / income) * 100 : 100;

    return {
      availableCapacity: Math.max(0, freeCash),
      maxDebtPayment,
      marginOfSafety,
      commitmentRatio,
      freeCash,
    };
  }
}