import { UUID } from '../../contracts/utils/uuid.contract';

import { CreateCodeDto } from './create-code.dto';

export class CreateCodesDto
  implements Omit<CreateCodeDto, 'value'> {
  templateId: UUID;
  payload: Record<string, string>;
  count: number;
}
