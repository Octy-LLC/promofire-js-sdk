import { HttpMethods } from '../enums/http-methods.enum';

export interface IRequestCommand {
  url: string;
  method: HttpMethods;
  body?: any;
  resolve: (value: any) => void;
  reject: (value: any) => void;
}
