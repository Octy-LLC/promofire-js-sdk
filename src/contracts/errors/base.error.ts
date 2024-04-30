import { ErrorCodes } from '../enums/errors-codes.enum';

export class BaseError extends Error {
  code: ErrorCodes;
}
