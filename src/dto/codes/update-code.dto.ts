import { ICodePayload } from '../../contracts/code/code-payload.contract';
import { CodeStatuses } from '../../contracts/code/code-statuses.enum';

export class UpdateCodeDto {
  payload?: ICodePayload;
  status?: CodeStatuses;
}
