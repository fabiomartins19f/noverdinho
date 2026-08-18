"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon2 = __importStar(require("argon2"));
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const app_exception_1 = require("../common/exceptions/app.exception");
let AuthService = class AuthService {
    prisma;
    users;
    jwt;
    config;
    constructor(prisma, users, jwt, config) {
        this.prisma = prisma;
        this.users = users;
        this.jwt = jwt;
        this.config = config;
    }
    async hashPassword(password) {
        return argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2 });
    }
    async verifyPassword(hash, password) {
        try {
            return await argon2.verify(hash, password);
        }
        catch {
            return false;
        }
    }
    hashToken(token) {
        return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    async issueAccessToken(user, sessionId) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            currency: user.currency,
            type: 'access',
            sessionId,
        };
        return this.jwt.signAsync(payload, {
            secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
            expiresIn: (this.config.get('JWT_ACCESS_EXPIRES_IN') ?? '15m'),
        });
    }
    async issueRefreshToken(userId, sessionId) {
        const payload = {
            sub: userId,
            email: '',
            name: '',
            currency: 'BRL',
            type: 'refresh',
            sessionId,
        };
        return this.jwt.signAsync(payload, {
            secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: (this.config.get('JWT_REFRESH_EXPIRES_IN') ?? '30d'),
        });
    }
    async createSession(userId, ip, userAgent) {
        const sessionId = (0, crypto_1.randomBytes)(16).toString('hex');
        const refreshToken = (0, crypto_1.randomBytes)(48).toString('base64url');
        const expiresAt = (0, date_fns_1.addDays)(new Date(), 30);
        await this.prisma.session.create({
            data: {
                id: sessionId,
                userId,
                refreshTokenHash: this.hashToken(refreshToken),
                ip: ip ?? null,
                userAgent: userAgent ?? null,
                expiresAt,
            },
        });
        return { sessionId, refreshToken, expiresAt };
    }
    async buildTokens(user, sessionId) {
        const [accessToken, refreshToken] = await Promise.all([
            this.issueAccessToken(user, sessionId),
            this.issueRefreshToken(user.id, sessionId),
        ]);
        return {
            accessToken,
            refreshToken,
            accessExpiresIn: 15 * 60,
        };
    }
    async register(dto, ip, userAgent) {
        const existing = await this.users.findByEmail(dto.email.toLowerCase());
        if (existing) {
            throw new app_exception_1.AppException('EMAIL_ALREADY_REGISTERED', 'E-mail já cadastrado.');
        }
        const passwordHash = await this.hashPassword(dto.password);
        const user = await this.users.create({
            name: dto.name,
            email: dto.email,
            passwordHash,
            phone: dto.phone,
        });
        const session = await this.createSession(user.id, ip, userAgent);
        const tokens = await this.buildTokens(user, session.sessionId);
        return { user: this.sanitize(user), tokens, sessionExpiresAt: session.expiresAt };
    }
    async login(dto, ip, userAgent) {
        const user = await this.users.findByEmail(dto.email.toLowerCase());
        if (!user || !(await this.verifyPassword(user.passwordHash, dto.password))) {
            throw new app_exception_1.AppException('INVALID_CREDENTIALS', 'E-mail ou senha inválidos.', 401);
        }
        if (user.status === 'BLOCKED') {
            throw new app_exception_1.AppException('USER_BLOCKED', 'Usuário bloqueado. Contate o suporte.', 403);
        }
        const session = await this.createSession(user.id, ip, userAgent);
        const tokens = await this.buildTokens(user, session.sessionId);
        return { user: this.sanitize(user), tokens, sessionExpiresAt: session.expiresAt };
    }
    async refresh(refreshToken, ip, userAgent) {
        const hash = this.hashToken(refreshToken);
        const session = await this.prisma.session.findUnique({
            where: { refreshTokenHash: hash },
            include: { user: true },
        });
        if (!session)
            throw new app_exception_1.AppException('INVALID_REFRESH_TOKEN', 'Sessão inválida.', 401);
        if (session.revokedAt || session.expiresAt < new Date()) {
            throw new app_exception_1.AppException('SESSION_REVOKED', 'Sessão expirada ou revogada. Faça login novamente.', 401);
        }
        if (session.user.status === 'BLOCKED') {
            throw new app_exception_1.AppException('USER_BLOCKED', 'Usuário bloqueado.', 403);
        }
        await this.prisma.session.update({
            where: { id: session.id },
            data: { revokedAt: new Date() },
        });
        const newSession = await this.createSession(session.userId, ip, userAgent);
        const tokens = await this.buildTokens(session.user, newSession.sessionId);
        return { tokens, sessionExpiresAt: newSession.expiresAt };
    }
    async logout(refreshToken) {
        const hash = this.hashToken(refreshToken);
        await this.prisma.session.updateMany({
            where: { refreshTokenHash: hash, revokedAt: null },
            data: { revokedAt: new Date() },
        });
        return { loggedOut: true };
    }
    async logoutAll(userId) {
        await this.prisma.session.updateMany({
            where: { userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
        return { loggedOut: true };
    }
    async forgotPassword(email) {
        const user = await this.users.findByEmail(email.toLowerCase());
        if (!user)
            return { sent: true };
        const rawToken = (0, crypto_1.randomBytes)(32).toString('hex');
        await this.prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                tokenHash: this.hashToken(rawToken),
                expiresAt: (0, date_fns_1.addDays)(new Date(), 1),
            },
        });
        return { sent: true, devToken: process.env.NODE_ENV === 'development' ? rawToken : undefined };
    }
    async resetPassword(token, newPassword) {
        const record = await this.prisma.passwordResetToken.findUnique({
            where: { tokenHash: this.hashToken(token) },
        });
        if (!record || record.usedAt || record.expiresAt < new Date()) {
            throw new app_exception_1.AppException('INVALID_REFRESH_TOKEN', 'Token de redefinição inválido ou expirado.', 400);
        }
        const passwordHash = await this.hashPassword(newPassword);
        await this.prisma.$transaction([
            this.prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
            this.prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
            this.prisma.session.updateMany({ where: { userId: record.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
        ]);
        return { reset: true };
    }
    sanitize(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            currency: user.currency,
            createdAt: user.createdAt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map