import { CodeTemplate } from '../entities/code-template.entity';

export class CodeTemplateSnapshot {
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
