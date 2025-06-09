import { ICodePayload } from '../../contracts/code/code-payload.contract';
import { CodeTemplateStatuses } from 'src/contracts/enums/code-template-statuses.enum';

export class UpdateCodeTemplateDto {
  name: string;
  payload: ICodePayload;
  amount: string;
  ttl: number;
  hasMutablePayload?: boolean;
  isUsableByCustomers: boolean;
  description: string;
  status?: CodeTemplateStatuses;
}
