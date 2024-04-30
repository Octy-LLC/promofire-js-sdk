import { HttpMethods } from '../enums/http-methods.enum';

export interface IClientState {
  tenant: string;
  secret: string;
  authenticate(userId: string): Promise<IClientState>;
  request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T>;
}
