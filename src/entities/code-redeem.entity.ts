import { UUID } from '../contracts/utils/uuid.contract';

import { Platforms } from '../contracts/enums/platforms.enum';

export class CodeRedeem {
  id: number;
  redeemerId: UUID;
  code: string;
  platform: Platforms | null;
  country: string | null;
  templateId: UUID;
  redeemedAt: string;
}
