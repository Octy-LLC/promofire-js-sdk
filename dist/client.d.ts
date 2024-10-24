import { IClientState } from './contracts/client/client-state.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
export declare class Client implements IClientState {
    tenant: string;
    secret: string;
    constructor(tenant: string, secret: string);
    authenticate(): Promise<AuthenticatedClient>;
    request(): Promise<never>;
}
export declare class AuthenticatedClient implements IClientState {
    tenant: string;
    secret: string;
    private token?;
    constructor(tenant: string, secret: string, token: string);
    authenticate(): Promise<never>;
    request<T = any>(path: string, method: HttpMethods, body?: any): Promise<T>;
}
