import { UUID } from '../contracts/utils/uuid.contract';
import { Platforms } from '../contracts/enums/platforms.enum';
export declare class SdkSecret {
    id: UUID;
    title: string;
    value: string;
    plaform: Platforms;
}
