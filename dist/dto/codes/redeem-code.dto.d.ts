import { UUID } from '../../contracts/utils/uuid.contract';
import { Platforms } from '../../contracts/enums/platforms.enum';
export declare class RedeemCodeDto {
    codeValue: string;
    country?: string;
    platform?: Platforms;
    redeemerId: UUID;
}
