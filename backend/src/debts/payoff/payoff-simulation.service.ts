import { Injectable } from '@nestjs/common';
import { DebtPriorityInput, DebtPriorityService, PriorityStrategy } from './debt-priority.service';
import { AppException } from '../../common/exceptions/app.exception';

export interface PayoffInputDebt extends DebtPriorityInput {
  type: string;
  dueDate: string; // ISO
}

export interface PayoffSimulationResult {
  strategy: PriorityStrategy;
  monthlyBudget: number;
  order: Array<{ debtId: string; creditor: string; order: number; payoffMonth: number; projectedPayoffDate: string; amountPerMonth: number }>;
  estimatedMonths: number;
  estimatedInterest: number;
  estimatedTotal: number;
  baselineInterest: number;
  economy: number;
  projectedPayoffDate: string;
  feasible: boolean;
}

export interface SimulationState {
  id: string;
  creditor: string;
  balance: number;
  annualRate: number;
  minimum: number;
  payoffMonth: number | null;
  amountPerMonth: number;
}

const MAX_MONTHS = 480; // 40 anos — teto de segurança da simulação
const CENT = 0.005;

/**
 * Simulador determinístico do plano de quitação.
 *
 * A cada mês:
 *  1. juros incidem sobre o saldo (taxa anual / 12)
 *  2. todas as dívidas recebem a parcela mínima
 *  3. o excedente do orçamento é aplicado na dívida de maior prioridade
 *
 * A baseline (somente parcelas mínimas, sem excedente) é simulada em paralelo
 * para calcular a economia estimada do plano.
 */
@Injectable()
export class PayoffSimulationService {
  constructor(private readonly priority: DebtPriorityService) {}

  simulate(input: { debts: PayoffInputDebt[]; monthlyBudget: number; strategy: PriorityStrategy }): PayoffSimulationResult {
    const { strategy, monthlyBudget } = input;
    if (monthlyBudget <= 0) {
      throw new AppException('INVALID_AMOUNT', 'O valor mensal destinado às dívidas deve ser maior que zero.');
    }

    const active = input.debts.filter((d) => d.status !== 'PAID_OFF' && d.status !== 'CANCELED' && d.currentBalance > 0);
    if (active.length === 0) {
      throw new AppException('NO_DEBTS_FOR_PLAN', 'Você não possui dívidas ativas para planejar.');
    }

    const ordered = this.priority.orderDebts(active, strategy);
    const orderById = new Map(ordered.map((o, i) => [o.debt.id, i]));

    const now = new Date();
    const states: SimulationState[] = active.map((debt) => ({
      id: debt.id,
      creditor: debt.creditor,
      balance: Math.round(debt.currentBalance * 100) / 100,
      annualRate: debt.annualRate,
      minimum: Math.min(debt.installmentAmount, debt.currentBalance),
      payoffMonth: null,
      amountPerMonth: 0,
    }));

    // Plano real (com excedente na dívida prioritária).
    const plan = this.simulateMonths(states, ordered, monthlyBudget, false, MAX_MONTHS);

    // Baseline: pagar apenas o mínimo, pelo mesmo horizonte do plano —
    // comparação justa e finita (evita explosão exponencial em dívidas insolventes).
    const baseline = this.simulateMonths(states, ordered, monthlyBudget, true, plan.totalMonths);

    const paidItems = plan.order.filter(
      (entry): entry is [string, number, number] => entry[1] !== null,
    );
    const items = paidItems.map(([id, m, amount], i) => {
      const debt = active.find((d) => d.id === id)!;
      return {
        debtId: id,
        creditor: debt.creditor,
        order: orderById.get(id)! + 1,
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

  private simulateMonths(
    initialStates: SimulationState[],
    ordered: { debt: DebtPriorityInput; order: number }[],
    monthlyBudget: number,
    baselineOnly: boolean,
    maxMonths: number,
  ): { totalInterest: number; totalPaid: number; totalMonths: number; order: [string, number | null, number][]; feasible: boolean } {
    const states = initialStates.map((s) => ({ ...s }));
    const order: [string, number | null, number][] = states.map((s) => [s.id, null, 0]);
    let totalInterest = 0;
    let totalPaid = 0;
    let feasible = true;
    let totalMonths = 0;

    const minimumSum = states.reduce((acc, s) => acc + s.minimum, 0);
    if (minimumSum > monthlyBudget + CENT) feasible = false;

    for (let month = 1; month <= maxMonths; month++) {
      totalMonths = month;
      // 1. Juros mensais
      for (const state of states) {
        if (state.balance <= 0) continue;
        const monthlyRate = state.annualRate > 0 ? state.annualRate / 100 / 12 : 0;
        const interest = state.balance * monthlyRate;
        state.balance = state.balance + interest;
        totalInterest += interest;
      }

      // 2. Pagamentos mínimos
      let used = 0;
      for (const state of states) {
        if (state.balance <= 0) continue;
        const payment = Math.min(state.minimum, state.balance, monthlyBudget - used);
        if (payment <= 0) continue;
        state.balance = state.balance - payment;
        totalPaid += payment;
        used += payment;
      }

      if (baselineOnly) {
        if (states.every((s) => s.balance <= CENT)) break;
        continue;
      }

      // Registra quitações completadas apenas pelos pagamentos mínimos.
      for (const state of states) {
        if (state.balance <= CENT && state.payoffMonth === null) {
          state.payoffMonth = month;
          const idx = order.findIndex(([id]) => id === state.id);
          order[idx] = [state.id, month, state.minimum];
        }
      }

      // 3. Excedente na dívida de maior prioridade
      const extra = Math.max(0, monthlyBudget - used);
      if (extra > 0) {
        for (const { debt } of ordered) {
          const state = states.find((s) => s.id === debt.id);
          if (!state || state.balance <= CENT) continue;
          const payment = Math.min(extra, state.balance);
          if (payment <= 0) continue;
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

      if (states.every((s) => s.balance <= CENT)) break;
    }

    return { totalInterest, totalPaid, order, feasible, totalMonths };
  }

  private projectedDate(now: Date, months: number): string {
    const date = new Date(now.getFullYear(), now.getMonth() + months, 1);
    return date.toISOString().split('T')[0];
  }
}