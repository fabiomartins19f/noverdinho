import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthUser } from '../common/decorators/current-user.decorator';
import { AuditService } from '../audit/audit.service';
import type { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly audit;
    constructor(authService: AuthService, audit: AuditService);
    register(dto: RegisterDto, ip: string, req: Request): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            currency: string;
            createdAt: Date;
        };
        tokens: import("./auth.service").AuthTokens;
        sessionExpiresAt: Date;
    }>;
    login(dto: LoginDto, ip: string, req: Request): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            currency: string;
            createdAt: Date;
        };
        tokens: import("./auth.service").AuthTokens;
        sessionExpiresAt: Date;
    }>;
    refresh(dto: RefreshDto, ip: string, req: Request): Promise<{
        tokens: import("./auth.service").AuthTokens;
        sessionExpiresAt: Date;
    }>;
    logout(dto: RefreshDto): Promise<{
        loggedOut: boolean;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        sent: boolean;
        devToken?: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        reset: boolean;
    }>;
    logoutAll(user: AuthUser, ip: string): Promise<{
        loggedOut: boolean;
    }>;
}
