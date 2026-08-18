export declare function startOfCurrentMonth(): Date;
export declare function endOfCurrentMonth(): Date;
export declare function monthRange(year: number, month: number): {
    start: Date;
    end: Date;
};
export declare function isSameMonth(a: Date, b: Date): boolean;
export declare function daysUntil(date: Date): number;
export declare function lastNMonths(n: number): Date[];
export declare function addMonthsSafe(date: Date, months: number): Date;
export declare function addDaysSafe(date: Date, days: number): Date;
