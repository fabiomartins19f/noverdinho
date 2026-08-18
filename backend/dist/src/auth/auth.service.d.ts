import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    accessExpiresIn: number;
}
export declare class AuthService {
    private readonly prisma;
    private readonly users;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, users: UsersService, jwt: JwtService, config: ConfigService);
    hashPassword(password: string): Promise<string>;
    verifyPassword(hash: string, password: string): Promise<boolean>;
    private hashToken;
    private issueAccessToken;
    private issueRefreshToken;
    private createSession;
    buildTokens(user: {
        id: string;
        email: string;
        name: string;
        currency: string;
    }, sessionId: string): Promise<AuthTokens>;
    register(dto: {
        name: string;
        email: string;
        password: string;
        phone?: string;
    }, ip?: string, userAgent?: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            currency: string;
            createdAt: Date;
        };
        tokens: AuthTokens;
        sessionExpiresAt: Date;
    }>;
    login(dto: {
        email: string;
        password: string;
    }, ip?: string, userAgent?: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            currency: string;
            createdAt: Date;
        };
        tokens: AuthTokens;
        sessionExpiresAt: Date;
    }>;
    refresh(refreshToken: string, ip?: string, userAgent?: string): Promise<{
        tokens: AuthTokens;
        sessionExpiresAt: Date;
    }>;
    logout(refreshToken: string): Promise<{
        loggedOut: boolean;
    }>;
    logoutAll(userId: string): Promise<{
        loggedOut: boolean;
    }>;
    forgotPassword(email: string): Promise<{
        sent: boolean;
        devToken?: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        reset: boolean;
    }>;
    private sanitize;
}
