"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthenticated = void 0;
const errors_codes_enum_1 = require("../enums/errors-codes.enum");
const base_error_1 = require("./base.error");
class Unauthenticated extends base_error_1.BaseError {
    constructor() {
        super(...arguments);
        this.message = 'unauthenticated';
        this.code = errors_codes_enum_1.ErrorCodes.UNAUTHENTICATED;
    }
}
exports.Unauthenticated = Unauthenticated;
//# sourceMappingURL=unauthenticated.error.js.map