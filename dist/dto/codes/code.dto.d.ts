import { UUID } from '../../contracts/utils/uuid.contract';
import { CodeStatuses } from '../../contracts/code/code-statuses.enum';
import { ICodePayload } from '../../contracts/code/code-payload.contract';
export declare class CodeDto {
    value: string;
    templateId: UUID;
    amount: string;
    status: CodeStatuses;
    ownerId: UUID;
    expiresAt: number;
    createdAt: string;
    updatedAt: string;
    payload: ICodePayload;
}
