import { UUID } from '../contracts/utils/uuid.contract';
import { CodeTemplateStatuses } from '../contracts/enums/code-template-statuses.enum';
import { ICodePayload } from '../contracts/code/code-payload.contract';
export declare class CodeTemplate {
    id: UUID;
    name: string;
    creatorId: UUID;
    createdAt: string;
    hasMutablePayload: boolean;
    amount: number;
    isUsableByCustomers?: boolean;
    updatesHistory?: UUID;
    ttl: number;
    status: CodeTemplateStatuses;
    description: string;
    payload: ICodePayload;
}
export declare class CodeTemplatesDto {
    total: number;
    templates: CodeTemplate[];
}
