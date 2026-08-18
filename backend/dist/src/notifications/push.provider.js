"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const notifications_service_1 = require("../notifications/notifications.service");
let PushProvider = class PushProvider {
    notifications;
    config;
    logger = new common_1.Logger('PushProvider');
    configured;
    constructor(notifications, config) {
        this.notifications = notifications;
        this.config = config;
        this.configured = Boolean(config.get('APNS_KEY_PATH'));
    }
    async send(payload) {
        const devices = await this.notifications.devicesFor(payload.userId);
        if (!this.configured) {
            if (devices.length > 0) {
                this.logger.log(`[push:dry-run] ${payload.type} -> ${devices.length} device(s) — ${payload.title}`);
            }
            return;
        }
        this.logger.log(`[push] ${payload.type} -> ${devices.length} device(s)`);
    }
};
exports.PushProvider = PushProvider;
exports.PushProvider = PushProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        config_1.ConfigService])
], PushProvider);
//# sourceMappingURL=push.provider.js.map