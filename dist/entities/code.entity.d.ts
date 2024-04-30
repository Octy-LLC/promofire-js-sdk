import { UUID } from '../contracts/utils/uuid.contract';
import { CodeStatuses } from '../contracts/code/code-statuses.enum';
export declare class Code {
    value: string;
    template: UUID;
    amount: number;
    status: CodeStatuses;
    owner: UUID;
    expiresAt: number;
    createdAt: string;
    updatedAt: string;
    payload: Record<string, string>;
}
