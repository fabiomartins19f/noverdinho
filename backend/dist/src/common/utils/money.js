"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWO_DECIMALS = void 0;
exports.roundMoney = roundMoney;
exports.money = money;
exports.isPositive = isPositive;
exports.sumMoney = sumMoney;
exports.toNumber = toNumber;
exports.percentOf = percentOf;
const client_1 = require("../../generated/prisma/client");
exports.TWO_DECIMALS = 2;
function roundMoney(value) {
    return new client_1.Prisma.Decimal(value ?? 0).toDecimalPlaces(exports.TWO_DECIMALS);
}
function money(value) {
    return new client_1.Prisma.Decimal(value ?? 0);
}
function isPositive(value) {
    return new client_1.Prisma.Decimal(value ?? 0).greaterThan(0);
}
function sumMoney(values) {
    return values.reduce((acc, v) => acc.plus(v ?? 0), new client_1.Prisma.Decimal(0));
}
function toNumber(value) {
    if (value === null || value === undefined)
        return 0;
    return new client_1.Prisma.Decimal(value).toNumber();
}
function percentOf(part, total) {
    if (new client_1.Prisma.Decimal(total ?? 0).isZero())
        return new client_1.Prisma.Decimal(0);
    return new client_1.Prisma.Decimal(part ?? 0).div(total ?? 0).mul(100);
}
//# sourceMappingURL=money.js.map