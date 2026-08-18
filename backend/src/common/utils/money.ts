import { Prisma } from '../../generated/prisma/client';

export type MoneyValue = Prisma.Decimal | number | string | null | undefined;

export const TWO_DECIMALS = 2;

/** Arredonda um valor monetário para 2 casas (decimal.js, compatível com PostgreSQL NUMERIC). */
export function roundMoney(value: MoneyValue): Prisma.Decimal {
  return new Prisma.Decimal(value ?? 0).toDecimalPlaces(TWO_DECIMALS);
}

export function money(value: MoneyValue): Prisma.Decimal {
  return new Prisma.Decimal(value ?? 0);
}

export function isPositive(value: MoneyValue): boolean {
  return new Prisma.Decimal(value ?? 0).greaterThan(0);
}

export function sumMoney(values: MoneyValue[]): Prisma.Decimal {
  return values.reduce(
    (acc: Prisma.Decimal, v) => acc.plus(v ?? 0),
    new Prisma.Decimal(0),
  );
}
export function toNumber(value: MoneyValue): number {
  if (value === null || value === undefined) return 0;
  return new Prisma.Decimal(value).toNumber();
}

export function percentOf(part: MoneyValue, total: MoneyValue): Prisma.Decimal {
  if (new Prisma.Decimal(total ?? 0).isZero()) return new Prisma.Decimal(0);
  return new Prisma.Decimal(part ?? 0).div(total ?? 0).mul(100);
}
