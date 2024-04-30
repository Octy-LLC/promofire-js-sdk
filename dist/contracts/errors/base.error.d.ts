import { ErrorCodes } from '../enums/errors-codes.enum';
export declare class BaseError extends Error {
    code: ErrorCodes;
}
