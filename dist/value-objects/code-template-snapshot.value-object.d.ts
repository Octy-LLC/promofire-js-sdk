import { CodeTemplate } from '../entities/code-template.entity';
export declare class CodeTemplateSnapshot {
    readonly createdAt: Date;
    readonly amount: CodeTemplate['amount'];
    readonly payload: CodeTemplate['payload'];
    readonly ttl: CodeTemplate['ttl'];
    constructor(codeTemplate: CodeTemplate);
}
