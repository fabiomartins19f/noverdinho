"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = exports.RECURRING_QUEUE_NAME = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const recurring_processor_1 = require("./recurring.processor");
const debts_module_1 = require("../debts/debts.module");
const insights_module_1 = require("../insights/insights.module");
const notifications_module_1 = require("../notifications/notifications.module");
const push_provider_1 = require("../notifications/push.provider");
exports.RECURRING_QUEUE_NAME = 'noverdinho-recurring';
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
            bullmq_1.BullModule.registerQueue({ name: recurring_processor_1.RECURRING_QUEUE }),
            debts_module_1.DebtsModule,
            insights_module_1.InsightsModule,
            notifications_module_1.NotificationsModule,
        ],
        providers: [recurring_processor_1.RecurringProcessor, push_provider_1.PushProvider],
        exports: [bullmq_1.BullModule],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map