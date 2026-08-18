"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startOfCurrentMonth = startOfCurrentMonth;
exports.endOfCurrentMonth = endOfCurrentMonth;
exports.monthRange = monthRange;
exports.isSameMonth = isSameMonth;
exports.daysUntil = daysUntil;
exports.lastNMonths = lastNMonths;
exports.addMonthsSafe = addMonthsSafe;
exports.addDaysSafe = addDaysSafe;
const date_fns_1 = require("date-fns");
function startOfCurrentMonth() {
    return (0, date_fns_1.startOfMonth)(new Date());
}
function endOfCurrentMonth() {
    return (0, date_fns_1.endOfMonth)(new Date());
}
function monthRange(year, month) {
    const start = new Date(year, month - 1, 1);
    return { start, end: (0, date_fns_1.endOfMonth)(start) };
}
function isSameMonth(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
function daysUntil(date) {
    return (0, date_fns_1.differenceInCalendarDays)(date, new Date());
}
function lastNMonths(n) {
    const now = new Date();
    return Array.from({ length: n }, (_, i) => (0, date_fns_1.addMonths)((0, date_fns_1.startOfMonth)(now), -(n - 1 - i)));
}
function addMonthsSafe(date, months) {
    return (0, date_fns_1.addMonths)(date, months);
}
function addDaysSafe(date, days) {
    return (0, date_fns_1.addDays)(date, days);
}
//# sourceMappingURL=date.util.js.map