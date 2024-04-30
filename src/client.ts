import { IClientState } from './contracts/client/client-state.contract';
import { BASE_URL } from './contracts/constants/urls.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { AlreadyAuthenticated } from './contracts/errors/already-authenticated.error';
import { Unauthenticated } from './contracts/errors/unauthenticated.error';

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
  async authenticate(userId: string): Promise<AuthenticatedClient> {
    const url = new URL('/api/auth/sign-in/sdk', BASE_URL);

    const { accessToken } = await fetch(url, {
      method: HttpMethods.POST,
      body: JSON.stringify({ tenant: this.tenant, secret: this.secret, sub: userId }),
    })
      .then(async response => await response.json());

    const client = new AuthenticatedClient(this.tenant, this.secret, accessToken);

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

  request<T = any>(path: string, method: HttpMethods, body?: any): Promise<T> {
    const url = new URL(path, BASE_URL);

    const request = fetch(url, {
      headers: { 'Authorization': `Bearer ${this.token}` },
      method,
      body: JSON.stringify(body),
    })
      .then(async response => await response.json()) as Promise<T>;

    return request;
  }
}
