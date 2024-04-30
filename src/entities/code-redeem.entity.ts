import { UUID } from '../contracts/utils/uuid.contract';

import { CodeTemplate } from '../aggregates/code-template.aggregate';
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
