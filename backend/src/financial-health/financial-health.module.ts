import { Module } from '@nestjs/common';
import { FinancialHealthScoreService } from './financial-health-score.service';
import { FinancialHealthService } from './financial-health.service';
import { FinancialHealthController } from './financial-health.controller';

@Module({
  providers: [FinancialHealthScoreService, FinancialHealthService],
  controllers: [FinancialHealthController],
  exports: [FinancialHealthScoreService, FinancialHealthService],
})
export class FinancialHealthModule {}