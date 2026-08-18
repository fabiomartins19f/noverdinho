import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../generated/prisma/client';

export interface PushPayload {
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  data?: Record<string, unknown>;
}

/**
 * Provedor de push (APNs-ready).
 * Em produção, configure APNS_KEY_PATH/APNS_KEY_ID/APNS_TEAM_ID e envie via
 * 'apns2' ou serviço de push gerenciado. Sem configuração, apenas registra.
 */
@Injectable()
export class PushProvider {
  private readonly logger = new Logger('PushProvider');
  private readonly configured: boolean;

  constructor(
    private readonly notifications: NotificationsService,
    private readonly config: ConfigService,
  ) {
    this.configured = Boolean(config.get('APNS_KEY_PATH'));
  }

  async send(payload: PushPayload): Promise<void> {
    const devices = await this.notifications.devicesFor(payload.userId);

    if (!this.configured) {
      if (devices.length > 0) {
        this.logger.log(`[push:dry-run] ${payload.type} -> ${devices.length} device(s) — ${payload.title}`);
      }
      return;
    }

    // TODO(production): implementar envio real via APNs (HTTP/2 + JWT provider token).
    this.logger.log(`[push] ${payload.type} -> ${devices.length} device(s)`);
  }
}