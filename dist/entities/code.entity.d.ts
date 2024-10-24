import { UUID } from '../contracts/utils/uuid.contract';
import { CodeStatuses } from '../contracts/code/code-statuses.enum';
export declare class Code {
    value: string;
    templateId: UUID;
    amount: number;
    status: CodeStatuses;
    ownerId: UUID;
    expiresAt: number;
    createdAt: string;
    updatedAt: string;
    payload: Record<string, string>;
}
export declare class CodesDto {
    total: number;
    codes: Code[];
}
