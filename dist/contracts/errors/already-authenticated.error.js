"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyAuthenticated = void 0;
const errors_codes_enum_1 = require("../enums/errors-codes.enum");
const base_error_1 = require("./base.error");
class AlreadyAuthenticated extends base_error_1.BaseError {
    constructor() {
        super(...arguments);
        this.message = 'already authenticated';
        this.code = errors_codes_enum_1.ErrorCodes.ALREADY_AUTHENTICATED;
    }
}
exports.AlreadyAuthenticated = AlreadyAuthenticated;
//# sourceMappingURL=already-authenticated.error.js.map