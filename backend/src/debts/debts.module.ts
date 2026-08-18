import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { DebtPriorityService } from './payoff/debt-priority.service';
import { PayoffSimulationService } from './payoff/payoff-simulation.service';
import { PayoffPlanService } from './payoff/payoff-plan.service';
import { PayoffPlanController } from './payoff/payoff-plan.controller';

@Module({
  providers: [DebtsService, DebtPriorityService, PayoffSimulationService, PayoffPlanService],
  controllers: [DebtsController, PayoffPlanController],
  exports: [DebtsService, DebtPriorityService, PayoffSimulationService, PayoffPlanService],
})
export class DebtsModule {}