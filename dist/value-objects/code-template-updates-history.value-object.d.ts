import { UUID } from '../contracts/utils/uuid.contract';
import { CodeTemplateSnapshot } from './code-template-snapshot.value-object';
export declare class CodeTemplateUpdatesHistory {
    id: UUID;
    updates: CodeTemplateSnapshot[];
}
