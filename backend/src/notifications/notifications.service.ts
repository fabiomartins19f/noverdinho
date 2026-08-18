import { Injectable } from '@nestjs/common';
import { NotificationType, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, input: { type: NotificationType; title: string; body: string; data?: Prisma.InputJsonValue }) {
    return this.prisma.notification.create({
      data: { userId, type: input.type, title: input.title, body: input.body, data: input.data },
    });
  }

  async list(userId: string, page = 1, perPage = 20) {
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

  async markRead(userId: string, id: string) {
    return this.prisma.notification.updateMany({ where: { id, userId }, data: { isRead: true } });
  }

  async markAllRead(userId: string) {
    await this.prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } });
    return { updated: true };
  }

  // ---------- Dispositivos (APNs) ----------

  async registerDevice(userId: string, dto: { token: string; platform?: string; apnsTopic?: string }) {
    const existing = await this.prisma.pushDevice.findUnique({ where: { token: dto.token } });
    if (existing) {
      if (existing.userId !== userId) {
        // Token reassociado: o app deslogado perde o dispositivo antigo.
        await this.prisma.pushDevice.update({ where: { id: existing.id }, data: { userId, lastSeenAt: new Date() } });
        return existing;
      }
      return this.prisma.pushDevice.update({ where: { id: existing.id }, data: { lastSeenAt: new Date() } });
    }
    return this.prisma.pushDevice.create({
      data: { userId, token: dto.token, platform: dto.platform ?? 'ios', apnsTopic: dto.apnsTopic },
    });
  }

  async unregisterDevice(userId: string, token: string) {
    await this.prisma.pushDevice.deleteMany({ where: { token, userId } });
    return { removed: true };
  }

  async devicesFor(userId: string) {
    return this.prisma.pushDevice.findMany({ where: { userId } });
  }
}