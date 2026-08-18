import { PrismaService } from '../../prisma/prisma.service';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    health(): {
        status: string;
        uptime: number;
        timestamp: string;
    };
    database(): Promise<{
        status: string;
        database: string;
        message?: undefined;
    } | {
        status: string;
        database: string;
        message: string;
    }>;
}
