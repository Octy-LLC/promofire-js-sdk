import { CodeTemplate } from '../aggregates/code-template.aggregate';

export class CodeTemplateShapshot {
  readonly createdAt: Date = new Date;
  readonly amount: CodeTemplate['amount']; 
  readonly payload: CodeTemplate['payload'];
  readonly ttl: CodeTemplate['ttl'];

  constructor(codeTemplate: CodeTemplate) {
    this.amount = codeTemplate.amount;
    this.payload = codeTemplate.payload;
    this.ttl = codeTemplate.ttl;
  }
}
