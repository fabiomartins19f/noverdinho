import { Module } from '@nestjs/common';
import { FinancialCapacityService } from './financial-capacity.service';
import { CanISpendService } from './can-i-spend.service';
import { FinancialAnalysisController } from './financial-analysis.controller';

@Module({
  providers: [FinancialCapacityService, CanISpendService],
  controllers: [FinancialAnalysisController],
  exports: [FinancialCapacityService, CanISpendService],
})
export class FinancialAnalysisModule {}