export declare class CreateGoalDto {
    name: string;
    emoji?: string;
    targetAmount: number;
    currentAmount?: number;
    targetDate?: string;
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
}
export declare class UpdateGoalDto {
    name?: string;
    emoji?: string;
    targetAmount?: number;
    currentAmount?: number;
    targetDate?: string;
    priority?: 'HIGH' | 'MEDIUM' | 'LOW';
    status?: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
}
