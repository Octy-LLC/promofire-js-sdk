"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedClient = exports.AuthenticatingClient = exports.UnAuthenticatedClient = exports.ClientState = void 0;
const sdk_contract_1 = require("./contracts/constants/sdk.contract");
const urls_contract_1 = require("./contracts/constants/urls.contract");
const http_methods_enum_1 = require("./contracts/enums/http-methods.enum");
const platforms_enum_1 = require("./contracts/enums/platforms.enum");
const already_authenticated_error_1 = require("./contracts/errors/already-authenticated.error");
const unauthenticated_error_1 = require("./contracts/errors/unauthenticated.error");
const utils_1 = require("./utils");
class ClientState {
    constructor(options) {
        this.sdkVersion = sdk_contract_1.SDK_VERSION;
        this.platform = platforms_enum_1.Platforms.WEB;
        this.os = (0, utils_1.getOS)();
        this.secret = options.secret;
        this.appBuild = options.appBuild || 'unknown';
        this.appVersion = options.appVersion || 'unknown';
    }
}
exports.ClientState = ClientState;
class UnAuthenticatedClient extends ClientState {
    async authenticate(options) {
        const authUrl = new URL('/auth/sdk/customer', urls_contract_1.BASE_URL);
        const token = await fetch(authUrl, {
            body: JSON.stringify({
                secret: this.secret,
                platform: platforms_enum_1.Platforms.WEB,
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
            }),
            method: http_methods_enum_1.HttpMethods.POST,
        })
            .then(res => res.json())
            .then(res => res.accessToken);
        return new AuthenticatedClient({ ...this, token });
    }
    ;
    async request() {
        throw new unauthenticated_error_1.Unauthenticated;
    }
}
exports.UnAuthenticatedClient = UnAuthenticatedClient;
class AuthenticatingClient extends ClientState {
    constructor() {
        super(...arguments);
        this.requests = [];
    }
    async authenticate() {
        throw new already_authenticated_error_1.AlreadyAuthenticated;
    }
    async request(url, method, body) {
        return new Promise((resolve, reject) => {
            this.requests.push({ url, method, body, resolve, reject });
        });
    }
}
exports.AuthenticatingClient = AuthenticatingClient;
class AuthenticatedClient extends ClientState {
    constructor(options) {
        super(options);
        this.token = options.token;
    }
    async authenticate() {
        throw new already_authenticated_error_1.AlreadyAuthenticated;
    }
    async request(path, method, body) {
        const url = new URL(path, urls_contract_1.BASE_URL);
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
            if (err.message.startsWith('Unexpected token'))
                return undefined;
            else
                throw err;
        });
        return responseData;
    }
}
exports.AuthenticatedClient = AuthenticatedClient;
//# sourceMappingURL=client.js.map