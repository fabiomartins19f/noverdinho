import { addDays, addMonths, differenceInCalendarDays, endOfMonth, startOfMonth } from 'date-fns';

export function startOfCurrentMonth(): Date {
  return startOfMonth(new Date());
}

export function endOfCurrentMonth(): Date {
  return endOfMonth(new Date());
}

export function monthRange(year: number, month: number): { start: Date; end: Date } {
  const start = new Date(year, month - 1, 1);
  return { start, end: endOfMonth(start) };
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function daysUntil(date: Date): number {
  return differenceInCalendarDays(date, new Date());
}

export function lastNMonths(n: number): Date[] {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => addMonths(startOfMonth(now), -(n - 1 - i)));
}

export function addMonthsSafe(date: Date, months: number): Date {
  return addMonths(date, months);
}

export function addDaysSafe(date: Date, days: number): Date {
  return addDays(date, days);
}
