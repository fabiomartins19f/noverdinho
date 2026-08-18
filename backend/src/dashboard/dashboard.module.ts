import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { FinancialHealthModule } from '../financial-health/financial-health.module';

@Module({
  imports: [FinancialHealthModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}