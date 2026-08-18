import { Injectable } from '@nestjs/common';

export interface DebtPriorityInput {
  id: string;
  creditor: string;
  currentBalance: number;
  annualRate: number; // percentual ao ano (0 se não aplicável)
  installmentAmount: number; // parcela mínima mensal
  totalInstallments: number | null;
  paidInstallments: number;
  status: 'ACTIVE' | 'OVERDUE' | 'NEGOTIATED' | 'PAID_OFF' | 'CANCELED';
}

export type PriorityStrategy = 'AVALANCHE' | 'SNOWBALL';

export interface OrderedDebt {
  debt: DebtPriorityInput;
  order: number;
}

/**
 * Motor de priorização de dívidas (puro e determinístico).
 *
 * AVALANCHE — prioriza a maior taxa de juros (minimiza juros totais):
 *   1. maior taxa de juros (anual convertida para comparável)
 *   2. maior saldo
 *   3. menor credor (desempate alfabético estável)
 *
 * BOLA DE NEVE — prioriza a menor dívida (gera quitações rápidas):
 *   1. menor saldo
 *   2. menor número de parcelas restantes
 *   3. menor credor (desempate alfabético estável)
 */
@Injectable()
export class DebtPriorityService {
  orderDebts(debts: DebtPriorityInput[], strategy: PriorityStrategy): OrderedDebt[] {
    const active = debts.filter((d) => d.status !== 'PAID_OFF' && d.status !== 'CANCELED' && d.currentBalance > 0);

    const sorted = [...active].sort((a, b) => {
      if (strategy === 'AVALANCHE') {
        const rateDiff = b.annualRate - a.annualRate;
        if (rateDiff !== 0) return rateDiff;
        const balanceDiff = b.currentBalance - a.currentBalance;
        if (balanceDiff !== 0) return balanceDiff;
        return a.creditor.localeCompare(b.creditor);
      }
      // SNOWBALL
      const balanceDiff = a.currentBalance - b.currentBalance;
      if (balanceDiff !== 0) return balanceDiff;
      const remainingA = a.totalInstallments !== null ? a.totalInstallments - a.paidInstallments : Infinity;
      const remainingB = b.totalInstallments !== null ? b.totalInstallments - b.paidInstallments : Infinity;
      const installmentsDiff = remainingA - remainingB;
      if (installmentsDiff !== 0) return installmentsDiff;
      return a.creditor.localeCompare(b.creditor);
    });

    return sorted.map((debt, index) => ({ debt, order: index + 1 }));
  }
}