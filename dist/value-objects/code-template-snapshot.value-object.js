"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTemplateSnapshot = void 0;
class CodeTemplateSnapshot {
    constructor(codeTemplate) {
        this.createdAt = new Date;
        this.amount = codeTemplate.amount;
        this.payload = codeTemplate.payload;
        this.ttl = codeTemplate.ttl;
    }
}
exports.CodeTemplateSnapshot = CodeTemplateSnapshot;
//# sourceMappingURL=code-template-snapshot.value-object.js.map