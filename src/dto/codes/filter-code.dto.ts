import { UUID } from '../../contracts/utils/uuid.contract';

import { CodeStatuses } from '../../contracts/code/code-statuses.enum';
import { UserTypes } from '../../contracts/enums/user-types.enum';
import { IPaginable } from '../../contracts/dto/paginable.contract';

export class FilterCodeDto implements IPaginable {
  value?: string;
  status?: CodeStatuses;
  isExpired?: boolean;
  templateId?: UUID;
  ownerId?: UUID;
  ownerType?: UserTypes;

  limit: number;
  offset: number;
}
