export interface AppConfig {
    nodeEnv: string;
    port: number;
    databaseUrl: string;
    redis: {
        host: string;
        port: number;
        password?: string;
    };
    jwt: {
        accessSecret: string;
        accessExpiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    corsOrigins: string[];
    throttle: {
        ttlMs: number;
        limit: number;
    };
    auditEnabled: boolean;
    appName: string;
}
declare const _default: () => AppConfig;
export default _default;
