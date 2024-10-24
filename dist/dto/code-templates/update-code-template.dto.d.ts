import { CodeTemplateStatuses } from "src/contracts/enums/code-template-statuses.enum";
export declare class UpdateCodeTemplateDto {
    name: string;
    payload: {};
    amount: string;
    ttl: number;
    hasMutablePayload: boolean;
    isUsableByCustomers: boolean;
    description: string;
    status: CodeTemplateStatuses;
}
