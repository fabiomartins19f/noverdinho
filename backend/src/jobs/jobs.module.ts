import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RECURRING_QUEUE, RecurringProcessor } from './recurring.processor';
import { DebtsModule } from '../debts/debts.module';
import { InsightsModule } from '../insights/insights.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PushProvider } from '../notifications/push.provider';

export const RECURRING_QUEUE_NAME = 'noverdinho-recurring';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST') ?? 'localhost',
          port: config.get<number>('REDIS_PORT') ?? 6379,
          ...(config.get<string>('REDIS_PASSWORD') ? { password: config.get<string>('REDIS_PASSWORD') } : {}),
        },
      }),
    }),
    BullModule.registerQueue({ name: RECURRING_QUEUE }),
    DebtsModule,
    InsightsModule,
    NotificationsModule,
  ],
  providers: [RecurringProcessor, PushProvider],
  exports: [BullModule],
})
export class JobsModule {}