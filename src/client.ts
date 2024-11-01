import { IClientState } from './contracts/client/client-state.contract';
import { BASE_URL } from './contracts/constants/urls.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { AlreadyAuthenticated } from './contracts/errors/already-authenticated.error';
import { Unauthenticated } from './contracts/errors/unauthenticated.error';
import { CreateCustomerDto } from './dto/customers/create-customer.dto';

export class Client implements IClientState {
  tenant: string;
  secret: string;

  constructor(tenant: string, secret: string) {
    this.tenant = tenant;
    this.secret = secret;
  }

  /**
   * @param userId
   * tenant assigned user id
   */
  async authenticate(createCustomerDto: CreateCustomerDto): Promise<AuthenticatedClient> {
    const url = new URL('/auth/sdk', BASE_URL);
    const presetUrl = new URL('/customers/preset', BASE_URL);
    const createCustomerUrl = new URL('/customers', BASE_URL);

    const { accessToken } = await fetch(url, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tenant: this.tenant, secret: this.secret }),
    })
      .then(async response => await response.json());

    const data = await fetch(presetUrl, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ platform: 'WEB' }),
    })
      .then(async response => await response.json());

    const response = await fetch(createCustomerUrl, {
      method: HttpMethods.PUT,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.accessToken}`,
      },
      body: JSON.stringify({
        tenantAssignedId: createCustomerDto.tenantAssignedId,
        platform: createCustomerDto.platform,
        device: createCustomerDto.device,
        os: createCustomerDto.os,
        appBuild: createCustomerDto.appBuild,
        appVersion: createCustomerDto.appVersion,
        sdkVersion: createCustomerDto.sdkVersion,
        firstName: createCustomerDto.firstName,
        lastName: createCustomerDto.lastName,
        email: createCustomerDto.email,
        phone: createCustomerDto.phone,
      }),
    })
      .then(async res => await res.json());

    const client = new AuthenticatedClient(this.tenant, this.secret, response.accessToken);

    return client;
  };

  async request(): Promise<never> {
    throw new Unauthenticated;
  }
}

export class AuthenticatedClient implements IClientState {
  tenant: string;
  secret: string;
  private token?: string;

  constructor(tenant: string, secret: string, token: string) {
    this.tenant = tenant;
    this.secret = secret;
    this.token = token;
  }

  async authenticate(): Promise<never> {
    throw new AlreadyAuthenticated;
  }

  async request<T = any>(path: string, method: HttpMethods, body?: any): Promise<T> {
    const url = new URL(path, BASE_URL);
  
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
    });
  
    if (response.status === 204) {
      return undefined as unknown as T;
    }
  
    const responseData = await response.json();
    return responseData;
  }
}
