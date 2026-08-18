import { Prisma } from '../../generated/prisma/client';
export type MoneyValue = Prisma.Decimal | number | string | null | undefined;
export declare const TWO_DECIMALS = 2;
export declare function roundMoney(value: MoneyValue): Prisma.Decimal;
export declare function money(value: MoneyValue): Prisma.Decimal;
export declare function isPositive(value: MoneyValue): boolean;
export declare function sumMoney(values: MoneyValue[]): Prisma.Decimal;
export declare function toNumber(value: MoneyValue): number;
export declare function percentOf(part: MoneyValue, total: MoneyValue): Prisma.Decimal;
