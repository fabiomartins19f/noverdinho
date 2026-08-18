"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const throttler_1 = require("@nestjs/throttler");
const configuration_1 = __importDefault(require("./config/configuration"));
const prisma_module_1 = require("./prisma/prisma.module");
const audit_module_1 = require("./audit/audit.module");
const common_module_1 = require("./common/common.module");
const all_exceptions_filter_1 = require("./common/exceptions/all-exceptions.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const accounts_module_1 = require("./accounts/accounts.module");
const categories_module_1 = require("./categories/categories.module");
const transactions_module_1 = require("./transactions/transactions.module");
const credit_cards_module_1 = require("./credit-cards/credit-cards.module");
const debts_module_1 = require("./debts/debts.module");
const budgets_module_1 = require("./budgets/budgets.module");
const goals_module_1 = require("./goals/goals.module");
const financial_analysis_module_1 = require("./financial-analysis/financial-analysis.module");
const financial_health_module_1 = require("./financial-health/financial-health.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const reports_module_1 = require("./reports/reports.module");
const notifications_module_1 = require("./notifications/notifications.module");
const insights_module_1 = require("./insights/insights.module");
const jobs_module_1 = require("./jobs/jobs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => [
                    {
                        ttl: config.get('THROTTLE_TTL_MS') ?? 60_000,
                        limit: config.get('THROTTLE_LIMIT') ?? 120,
                    },
                ],
            }),
            bullmq_1.BullModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    connection: {
                        host: config.get('REDIS_HOST') ?? 'localhost',
                        port: config.get('REDIS_PORT') ?? 6379,
                        ...(config.get('REDIS_PASSWORD') ? { password: config.get('REDIS_PASSWORD') } : {}),
                    },
                }),
            }),
            jwt_1.JwtModule.register({}),
            prisma_module_1.PrismaModule,
            audit_module_1.AuditModule,
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            accounts_module_1.AccountsModule,
            categories_module_1.CategoriesModule,
            transactions_module_1.TransactionsModule,
            credit_cards_module_1.CreditCardsModule,
            debts_module_1.DebtsModule,
            budgets_module_1.BudgetsModule,
            goals_module_1.GoalsModule,
            financial_analysis_module_1.FinancialAnalysisModule,
            financial_health_module_1.FinancialHealthModule,
            dashboard_module_1.DashboardModule,
            reports_module_1.ReportsModule,
            notifications_module_1.NotificationsModule,
            insights_module_1.InsightsModule,
            jobs_module_1.JobsModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            { provide: core_1.APP_FILTER, useClass: all_exceptions_filter_1.AllExceptionsFilter },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map