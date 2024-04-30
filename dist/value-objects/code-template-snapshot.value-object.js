"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeTemplateShapshot = void 0;
class CodeTemplateShapshot {
    constructor(codeTemplate) {
        this.createdAt = new Date;
        this.amount = codeTemplate.amount;
        this.payload = codeTemplate.payload;
        this.ttl = codeTemplate.ttl;
    }
}
exports.CodeTemplateShapshot = CodeTemplateShapshot;
//# sourceMappingURL=code-template-snapshot.value-object.js.map