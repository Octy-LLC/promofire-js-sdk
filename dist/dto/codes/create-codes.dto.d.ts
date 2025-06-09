import { ICodePayload } from '../../contracts/code/code-payload.contract';
import { UUID } from '../../contracts/utils/uuid.contract';
import { CreateCodeDto } from './create-code.dto';
export declare class CreateCodesDto implements Omit<CreateCodeDto, 'value'> {
    templateId: UUID;
    payload: ICodePayload;
    count: number;
}
