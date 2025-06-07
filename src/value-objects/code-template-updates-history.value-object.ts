import { UUID } from '../contracts/utils/uuid.contract';

import { CodeTemplateSnapshot } from './code-template-snapshot.value-object';

export class CodeTemplateUpdatesHistory {
  id: UUID;
  updates: CodeTemplateSnapshot[];
}
