import { CreateCustomerDto } from 'src/dto/customers/create-customer.dto';
import { HttpMethods } from '../enums/http-methods.enum';

export interface IClientState {
  tenant: string;
  secret: string;
  authenticate(createCustomerDto: CreateCustomerDto): Promise<IClientState>;
  request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T>;
}
