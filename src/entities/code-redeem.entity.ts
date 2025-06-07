import { UUID } from '../contracts/utils/uuid.contract';

import { CodeTemplate } from './code-template.entity';
import { Platforms } from '../contracts/enums/platforms.enum';
import { Code } from './code.entity';

export class CodeRedeem {
  id: number;
  redeemer: UUID;
  code: Code;
  platform?: Platforms;
  country?: string;
  template: CodeTemplate;
  redeemedAt: string;
}
