import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuditAction, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async log(
    action: AuditAction,
    input: {
      userId?: string;
      entity?: string;
      entityId?: string;
      metadata?: Prisma.InputJsonValue;
      ip?: string;
    },
  ): Promise<void> {
    if (this.config.get<boolean>('auditEnabled') === false) return;

    await this.prisma.auditLog.create({
      data: {
        userId: input.userId ?? null,
        action,
        entity: input.entity ?? null,
        entityId: input.entityId ?? null,
        metadata: input.metadata ?? undefined,
        ip: input.ip ?? null,
      },
    });
  }
}
