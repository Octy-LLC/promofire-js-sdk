import { ErrorCodes } from '../enums/errors-codes.enum';
import { BaseError } from './base.error';

export class Unauthenticated extends BaseError {
  message: string = 'unauthenticated';
  code: ErrorCodes = ErrorCodes.UNAUTHENTICATED;
}
