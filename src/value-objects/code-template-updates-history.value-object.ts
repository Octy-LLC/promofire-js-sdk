import { UUID } from '../contracts/utils/uuid.contract';

import { CodeTemplateShapshot } from './code-template-snapshot.value-object';

export class CodeTemplateUpdatesHistory {
  id: UUID;
  updates: CodeTemplateShapshot[];
}
