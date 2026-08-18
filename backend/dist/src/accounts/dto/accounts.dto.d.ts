import { AccountType } from '../../generated/prisma/client';
export declare class CreateAccountDto {
    name: string;
    type?: AccountType;
    initialBalance: number;
    institution?: string;
}
export declare class UpdateAccountDto {
    name?: string;
    type?: AccountType;
    institution?: string;
    isActive?: boolean;
}
