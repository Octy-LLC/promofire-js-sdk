import { IAuthenticateClient } from './contracts/client/authenticate-client.contract';
import { IConstructAuthenticatedClientState, IConstructClientState } from './contracts/client/construct-client-state.contract';
import { IRequestCommand } from './contracts/client/request-command.contract';
import { BASE_URL } from './contracts/constants/urls.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { AlreadyAuthenticated } from './contracts/errors/already-authenticated.error';
import { Unauthenticated } from './contracts/errors/unauthenticated.error';
import { getOS } from './utils';

export abstract class ClientState {
  secret: string;

  protected sdkVersion: string;
  protected platform: 'WEB';
  protected device: string;
  protected os = getOS();
  protected appBuild: string;
  protected appVersion: string;

  constructor(options: IConstructClientState) {
    this.secret = options.secret;
    this.appBuild = options.appBuild || 'unknown';
    this.appVersion = options.appVersion || 'unknown';
  }

  abstract authenticate(options: IAuthenticateClient): Promise<ClientState>;
  abstract request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T>;
}

export class Client extends ClientState {
  async authenticate(options: IAuthenticateClient): Promise<AuthenticatedClient> {
    const sdkAuthUrl = new URL('/auth/sdk', BASE_URL);
    const presetUrl = new URL('/customers/preset', BASE_URL);
    const createCustomerUrl = new URL('/customers', BASE_URL);

    const sdkAuth = await fetch(sdkAuthUrl, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ secret: this.secret }),
    })
      .then(async response => await response.json());

    const preset = await fetch(presetUrl, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sdkAuth.accessToken}`,
      },
      body: JSON.stringify({ platform: 'WEB' }),
    })
      .then(async response => await response.json());

    if (options.customerUserId) {
      const response = await fetch(createCustomerUrl, {
        method: HttpMethods.PUT,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${preset.accessToken}`,
        },
        body: JSON.stringify({
          customerUserId: options.customerUserId,
          platform: 'WEB',
          device: this.device,
          os: this.os,
          appBuild: this.appBuild,
          appVersion: this.appVersion,
          sdkVersion: this.sdkVersion,
          firstName: options.firstName,
          lastName: options.lastName,
          email: options.email,
          phone: options.phone,
        }),
      })
        .then(async res => await res.json());

      return new AuthenticatedClient({ ...(this as any), token: response.accessToken });
    }

    return new AuthenticatedClient({ ...(this as any), token: preset.accessToken });
  };

  async request(): Promise<never> {
    throw new Unauthenticated;
  }
}

export class AuthenticatingClient extends ClientState {
  requests: IRequestCommand[] = [];

  async authenticate(): Promise<AuthenticatedClient> {
    throw new AlreadyAuthenticated;
  }

  async request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.requests.push({ url, method, body, resolve, reject });
    });
  }
}

export class AuthenticatedClient extends ClientState {
  secret: string;
  private token: string;

  constructor(options: IConstructAuthenticatedClientState) {
    super(options);

    this.token = options.token;
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

    const responseData = await response.json()
      .catch(err => {
        if (err.message.startsWith('Unexpected token')) return undefined;
        else throw err;
      });

    return responseData;
  }
}
