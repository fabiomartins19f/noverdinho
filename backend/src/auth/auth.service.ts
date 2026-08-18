import { createHash, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { addDays } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AppException } from '../common/exceptions/app.exception';
import { JwtPayload } from './strategies/jwt.strategy';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ---------- Hash ----------

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2 });
  }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch {
      return false;
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  // ---------- Tokens ----------

  private async issueAccessToken(user: { id: string; email: string; name: string; currency: string }, sessionId: string): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      currency: user.currency,
      type: 'access',
      sessionId,
    };
    return this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m') as JwtSignOptions['expiresIn'],
    });
  }

  private async issueRefreshToken(userId: string, sessionId: string): Promise<string> {
    const payload: JwtPayload = {
      sub: userId,
      email: '',
      name: '',
      currency: 'BRL',
      type: 'refresh',
      sessionId,
    };
    return this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '30d') as JwtSignOptions['expiresIn'],
    });
  }

  private async createSession(userId: string, ip?: string, userAgent?: string): Promise<{ sessionId: string; refreshToken: string; expiresAt: Date }> {
    const sessionId = randomBytes(16).toString('hex');
    const refreshToken = randomBytes(48).toString('base64url');
    const expiresAt = addDays(new Date(), 30);

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

  async buildTokens(user: { id: string; email: string; name: string; currency: string }, sessionId: string): Promise<AuthTokens> {
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

  // ---------- Fluxos ----------

  async register(dto: { name: string; email: string; password: string; phone?: string }, ip?: string, userAgent?: string) {
    const existing = await this.users.findByEmail(dto.email.toLowerCase());
    if (existing) {
      throw new AppException('EMAIL_ALREADY_REGISTERED', 'E-mail já cadastrado.');
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

  async login(dto: { email: string; password: string }, ip?: string, userAgent?: string) {
    const user = await this.users.findByEmail(dto.email.toLowerCase());
    if (!user || !(await this.verifyPassword(user.passwordHash, dto.password))) {
      throw new AppException('INVALID_CREDENTIALS', 'E-mail ou senha inválidos.', 401);
    }
    if (user.status === 'BLOCKED') {
      throw new AppException('USER_BLOCKED', 'Usuário bloqueado. Contate o suporte.', 403);
    }

    const session = await this.createSession(user.id, ip, userAgent);
    const tokens = await this.buildTokens(user, session.sessionId);

    return { user: this.sanitize(user), tokens, sessionExpiresAt: session.expiresAt };
  }

  async refresh(refreshToken: string, ip?: string, userAgent?: string) {
    // Rotação de refresh token: a sessão antiga é revogada e uma nova é emitida.
    const hash = this.hashToken(refreshToken);
    const session = await this.prisma.session.findUnique({
      where: { refreshTokenHash: hash },
      include: { user: true },
    });

    if (!session) throw new AppException('INVALID_REFRESH_TOKEN', 'Sessão inválida.', 401);
    if (session.revokedAt || session.expiresAt < new Date()) {
      throw new AppException('SESSION_REVOKED', 'Sessão expirada ou revogada. Faça login novamente.', 401);
    }
    if (session.user.status === 'BLOCKED') {
      throw new AppException('USER_BLOCKED', 'Usuário bloqueado.', 403);
    }

    await this.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });

    const newSession = await this.createSession(session.userId, ip, userAgent);
    const tokens = await this.buildTokens(session.user, newSession.sessionId);

    return { tokens, sessionExpiresAt: newSession.expiresAt };
  }

  async logout(refreshToken: string) {
    const hash = this.hashToken(refreshToken);
    await this.prisma.session.updateMany({
      where: { refreshTokenHash: hash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { loggedOut: true };
  }

  async logoutAll(userId: string) {
    await this.prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { loggedOut: true };
  }

  async forgotPassword(email: string): Promise<{ sent: boolean; devToken?: string }> {
    const user = await this.users.findByEmail(email.toLowerCase());
    // Não revelar se o e-mail existe (anti-enumeração).
    if (!user) return { sent: true };

    const rawToken = randomBytes(32).toString('hex');
    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(rawToken),
        expiresAt: addDays(new Date(), 1),
      },
    });

    // TODO(production): enviar e-mail com o token via provedor transacional.
    // Em dev, devolvemos o token para teste.
    return { sent: true, devToken: process.env.NODE_ENV === 'development' ? rawToken : undefined };
  }

  async resetPassword(token: string, newPassword: string) {
    const record = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash: this.hashToken(token) },
    });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
      throw new AppException('INVALID_REFRESH_TOKEN', 'Token de redefinição inválido ou expirado.', 400);
    }

    const passwordHash = await this.hashPassword(newPassword);
    await this.prisma.$transaction([
      this.prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
      this.prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      this.prisma.session.updateMany({ where: { userId: record.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
    ]);

    return { reset: true };
  }

  private sanitize(user: { id: string; name: string; email: string; phone: string | null; currency: string; createdAt: Date }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      currency: user.currency,
      createdAt: user.createdAt,
    };
  }
}