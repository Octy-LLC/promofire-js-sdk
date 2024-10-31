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
    sortBy?: SortingCriteria;
    sortOrder?: 'asc' | 'desc';
    limit: number;
    offset: number;
    from: string;
    to: string;
}
type SortingCriteria = "value" | "status" | "redeems" | "newCustomers" | "expiresAt";
export {};
