import { IAuthenticateClient } from './contracts/client/authenticate-client.contract';
import { IConstructAuthenticatedClientState, IConstructClientState } from './contracts/client/construct-client-state.contract';
import { IRequestCommand } from './contracts/client/request-command.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { Platforms } from './contracts/enums/platforms.enum';
export declare abstract class ClientState {
    readonly secret: string;
    protected readonly sdkVersion = "0.4.1";
    protected readonly platform: Platforms;
    protected readonly device: string;
    protected readonly os: string;
    protected readonly appBuild: string;
    protected readonly appVersion: string;
    constructor(options: IConstructClientState);
    abstract authenticate(options: IAuthenticateClient): Promise<ClientState>;
    abstract request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T>;
}
export declare class UnAuthenticatedClient extends ClientState {
    authenticate(options: IAuthenticateClient): Promise<AuthenticatedClient>;
    request(): Promise<never>;
}
export declare class AuthenticatingClient extends ClientState {
    requests: IRequestCommand[];
    authenticate(): Promise<AuthenticatedClient>;
    request<T = any>(url: string, method: HttpMethods, body?: any): Promise<T>;
}
export declare class AuthenticatedClient extends ClientState {
    secret: string;
    private token;
    constructor(options: IConstructAuthenticatedClientState);
    authenticate(): Promise<never>;
    request<T = any>(path: string, method: HttpMethods, body?: any): Promise<T>;
}
