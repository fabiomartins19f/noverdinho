import { FinancialHealthService } from './financial-health.service';
import { AuthUser } from '../common/decorators/current-user.decorator';
declare class EvolutionQueryDto {
    months?: number;
}
export declare class FinancialHealthController {
    private readonly health;
    constructor(health: FinancialHealthService);
    score(user: AuthUser): Promise<{
        evolution: {
            month: string;
            score: number;
        }[];
        score: number;
        band: "CRITICAL" | "ATTENTION" | "EVOLVING" | "ON_TRACK" | "EXCELLENT";
        bandLabel: string;
        message: string;
        breakdown: Array<{
            factor: string;
            weight: number;
            value: number;
        }>;
    }>;
    evolution(user: AuthUser, query: EvolutionQueryDto): Promise<{
        month: string;
        score: number;
    }[]>;
}
export {};
