"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const required = (key) => {
    const value = process.env[key];
    if (!value)
        throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
    return value;
};
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    databaseUrl: required('DATABASE_URL'),
    redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
    },
    jwt: {
        accessSecret: required('JWT_ACCESS_SECRET'),
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
        refreshSecret: required('JWT_REFRESH_SECRET'),
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
    },
    corsOrigins: (process.env.CORS_ORIGINS ?? '')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean),
    throttle: {
        ttlMs: parseInt(process.env.THROTTLE_TTL_MS ?? '60000', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT ?? '120', 10),
    },
    auditEnabled: process.env.AUDIT_ENABLED !== 'false',
    appName: process.env.APP_NAME ?? 'No Verdinho',
});
//# sourceMappingURL=configuration.js.map