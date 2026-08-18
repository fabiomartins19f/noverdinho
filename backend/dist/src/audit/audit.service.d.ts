import { ConfigService } from '@nestjs/config';
import { AuditAction, Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuditService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    log(action: AuditAction, input: {
        userId?: string;
        entity?: string;
        entityId?: string;
        metadata?: Prisma.InputJsonValue;
        ip?: string;
    }): Promise<void>;
}
