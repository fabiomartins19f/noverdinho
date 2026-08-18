import { CanISpendService } from './can-i-spend.service';
import { FinancialCapacityService } from './financial-capacity.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
declare class CanISpendDto {
    amount: number;
}
declare class CapacityInputDto {
    monthlyIncome: number;
    essentialExpenses: number;
    mandatoryCommitments: number;
    safetyMarginPercent?: number;
}
export declare class FinancialAnalysisController {
    private readonly canISpend;
    private readonly capacity;
    constructor(canISpend: CanISpendService, capacity: FinancialCapacityService);
    analyzeCanISpend(user: AuthUser, dto: CanISpendDto): Promise<import("./can-i-spend.service").CanISpendResult>;
    computeCapacity(_user: AuthUser, dto: CapacityInputDto): import("./financial-capacity.service").CapacityResult;
}
export {};
