import { CodeTemplate } from '../aggregates/code-template.aggregate';
export declare class CodeTemplateShapshot {
    readonly createdAt: Date;
    readonly amount: CodeTemplate['amount'];
    readonly payload: CodeTemplate['payload'];
    readonly ttl: CodeTemplate['ttl'];
    constructor(codeTemplate: CodeTemplate);
}
