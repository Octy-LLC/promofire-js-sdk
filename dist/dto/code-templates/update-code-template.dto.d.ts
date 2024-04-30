import { ICodePayload } from 'src/contracts/code/code-payload.contract';
import { CreateCodeTemplateDto } from './create-code-template.dto';
export declare class UpdateCodeTemplateDto implements Partial<CreateCodeTemplateDto> {
    payload?: ICodePayload;
    amount?: string;
    ttl?: number;
    hasMutablePayload?: boolean;
    isUsableByCustomers?: boolean;
}
