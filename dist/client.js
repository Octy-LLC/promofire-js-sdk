"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedClient = exports.AuthenticatingClient = exports.Client = exports.ClientState = void 0;
const urls_contract_1 = require("./contracts/constants/urls.contract");
const http_methods_enum_1 = require("./contracts/enums/http-methods.enum");
const already_authenticated_error_1 = require("./contracts/errors/already-authenticated.error");
const unauthenticated_error_1 = require("./contracts/errors/unauthenticated.error");
const utils_1 = require("./utils");
class ClientState {
    constructor(options) {
        this.os = (0, utils_1.getOS)();
        this.secret = options.secret;
        this.appBuild = options.appBuild || 'unknown';
        this.appVersion = options.appVersion || 'unknown';
    }
}
exports.ClientState = ClientState;
class Client extends ClientState {
    async authenticate(options) {
        const sdkAuthUrl = new URL('/auth/sdk', urls_contract_1.BASE_URL);
        const presetUrl = new URL('/customers/preset', urls_contract_1.BASE_URL);
        const createCustomerUrl = new URL('/customers', urls_contract_1.BASE_URL);
        const sdkAuth = await fetch(sdkAuthUrl, {
            method: http_methods_enum_1.HttpMethods.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secret: this.secret }),
        })
            .then(async (response) => await response.json());
        const preset = await fetch(presetUrl, {
            method: http_methods_enum_1.HttpMethods.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sdkAuth.accessToken}`,
            },
            body: JSON.stringify({ platform: 'WEB' }),
        })
            .then(async (response) => await response.json());
        if (options.customerUserId) {
            const response = await fetch(createCustomerUrl, {
                method: http_methods_enum_1.HttpMethods.PUT,
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
                .then(async (res) => await res.json());
            return new AuthenticatedClient({ ...this, token: response.accessToken });
        }
        return new AuthenticatedClient({ ...this, token: preset.accessToken });
    }
    ;
    async request() {
        throw new unauthenticated_error_1.Unauthenticated;
    }
}
exports.Client = Client;
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