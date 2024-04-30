import { UUID } from '../../contracts/utils/uuid.contract';
import { CodeStatuses } from '../../contracts/code/code-statuses.enum';
import { UserTypes } from '../../contracts/enums/user-types.enum';
import { IPaginable } from '../../contracts/dto/paginable.contract';
export declare class FilterCodeDto implements IPaginable {
    value?: string;
    status?: CodeStatuses;
    isExpired?: boolean;
    templateId?: UUID;
    ownerId?: UUID;
    ownerType?: UserTypes;
    limit: number;
    offset: number;
}
