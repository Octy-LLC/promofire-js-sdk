import { ICodePayload } from 'src/contracts/code/code-payload.contract';
export declare class CreateCodeTemplateDto {
    payload: ICodePayload;
    amount: string;
    ttl: number;
    hasMutablePayload: boolean;
    isUsableByCustomers: boolean;
}
