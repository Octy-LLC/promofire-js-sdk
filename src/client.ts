import { SDK_VERSION } from './contracts/constants/sdk.contract';
import { IAuthenticateClient } from './contracts/client/authenticate-client.contract';
import { IConstructAuthenticatedClientState, IConstructClientState } from './contracts/client/construct-client-state.contract';
import { IRequestCommand } from './contracts/client/request-command.contract';
import { BASE_URL } from './contracts/constants/urls.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { Platforms } from './contracts/enums/platforms.enum';
import { AlreadyAuthenticated } from './contracts/errors/already-authenticated.error';
import { Unauthenticated } from './contracts/errors/unauthenticated.error';
import { getOS } from './utils';

export abstract class ClientState {
  readonly secret: string;

  protected readonly sdkVersion = SDK_VERSION;
  protected readonly platform: Platforms = Platforms.WEB;
  protected readonly device: string;
  protected readonly os = getOS();
  protected readonly appBuild: string;
  protected readonly appVersion: string;

  constructor(options: IConstructClientState) {
    this.secret = options.secret;

    this.device = window.navigator.userAgent || 'unknown';
    this.appBuild = options.appBuild || 'unknown';
    this.appVersion = options.appVersion || 'unknown';
  }

  abstract authenticate(options: IAuthenticateClient): Promise<ClientState>;
  abstract request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T>;
}

export class UnAuthenticatedClient extends ClientState {
  async authenticate(options: IAuthenticateClient): Promise<AuthenticatedClient> {
    const authUrl = new URL('/auth/sdk/customer', BASE_URL);

    const payload = JSON.stringify({
      secret: this.secret,

      platform: Platforms.WEB,
      device: this.device,
      os: this.os,
      appBuild: this.appBuild,
      appVersion: this.appVersion,
      sdkVersion: this.sdkVersion,

      customerUserId: options.customerUserId,
      firstName: options.firstName,
      lastName: options.lastName,
      email: options.email,
      phone: options.phone,
    });

    const token = await fetch(authUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      method: HttpMethods.POST,
    })
      .then(res => res.json())
      .then(res => res.accessToken);

    return new AuthenticatedClient({ ...(this as any), token });
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

    if (response.status > 399) {
      const json = await response.json()
      throw new Error(json.message || 'Unknown error');
    }

    const responseData = await response.json()
      .catch(err => {
        if (err.message.startsWith('Unexpected token')) return undefined;
        else throw err;
      });

    return responseData;
  }
}
