import { UUID } from '../contracts/utils/uuid.contract';

import { Platforms } from '../contracts/enums/platforms.enum';

export class SdkSecret {
  id: UUID;
  title: string;
  value: string;
  plaform: Platforms;
}
