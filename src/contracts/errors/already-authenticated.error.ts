import { ErrorCodes } from '../enums/errors-codes.enum';
import { BaseError } from './base.error';

export class AlreadyAuthenticated extends BaseError {
  message: string = 'already authenticated';
  code: ErrorCodes = ErrorCodes.ALREADY_AUTHENTICATED;
}
