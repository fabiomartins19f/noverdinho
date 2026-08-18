import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload) {
    if (payload.type !== 'refresh' || !payload.sessionId) {
      throw new UnauthorizedException('Refresh token inválido.');
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      currency: payload.currency,
      sessionId: payload.sessionId,
    };
  }
}