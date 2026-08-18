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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, input) {
        return this.prisma.notification.create({
            data: { userId, type: input.type, title: input.title, body: input.body, data: input.data },
        });
    }
    async list(userId, page = 1, perPage = 20) {
        const [items, total, unread] = await Promise.all([
            this.prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * perPage,
                take: perPage,
            }),
            this.prisma.notification.count({ where: { userId } }),
            this.prisma.notification.count({ where: { userId, isRead: false } }),
        ]);
        return { items, total, unread, page, perPage, totalPages: Math.ceil(total / perPage) };
    }
    async markRead(userId, id) {
        return this.prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } });
    }
    async markAllRead(userId) {
        await this.prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
        return { updated: true };
    }
    async registerDevice(userId, dto) {
        const existing = await this.prisma.pushDevice.findUnique({ where: { token: dto.token } });
        if (existing) {
            if (existing.userId !== userId) {
                await this.prisma.pushDevice.update({ where: { id: existing.id }, data: { userId, lastSeenAt: new Date() } });
                return existing;
            }
            return this.prisma.pushDevice.update({ where: { id: existing.id }, data: { lastSeenAt: new Date() } });
        }
        return this.prisma.pushDevice.create({
            data: { userId, token: dto.token, platform: dto.platform ?? 'ios', apnsTopic: dto.apnsTopic },
        });
    }
    async unregisterDevice(userId, token) {
        await this.prisma.pushDevice.deleteMany({ where: { token, userId } });
        return { removed: true };
    }
    async devicesFor(userId) {
        return this.prisma.pushDevice.findMany({ where: { userId } });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map