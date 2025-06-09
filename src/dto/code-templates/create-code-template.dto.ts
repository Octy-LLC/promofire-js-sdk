import { ICodePayload } from '../../contracts/code/code-payload.contract';

export class CreateCodeTemplateDto {
  name: string;
  payload: ICodePayload;
  amount: string;
  ttl: number;
  hasMutablePayload: boolean;
  isUsableByCustomers: boolean;
  description: string;
}
