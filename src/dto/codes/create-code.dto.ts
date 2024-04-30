import { UUID } from '../../contracts/utils/uuid.contract';

import { ICodePayload } from '../../contracts/code/code-payload.contract';

export class CreateCodeDto {
  value: string;
  templateId: UUID;
  payload: ICodePayload;
}
