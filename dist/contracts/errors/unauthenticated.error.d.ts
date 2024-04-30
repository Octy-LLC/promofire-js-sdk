import { ErrorCodes } from '../enums/errors-codes.enum';
import { BaseError } from './base.error';
export declare class Unauthenticated extends BaseError {
    message: string;
    code: ErrorCodes;
}
