"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedClient = exports.Client = void 0;
const urls_contract_1 = require("./contracts/constants/urls.contract");
const http_methods_enum_1 = require("./contracts/enums/http-methods.enum");
const already_authenticated_error_1 = require("./contracts/errors/already-authenticated.error");
const unauthenticated_error_1 = require("./contracts/errors/unauthenticated.error");
class Client {
    constructor(tenant, secret) {
        this.tenant = tenant;
        this.secret = secret;
    }
    async authenticate(createCustomerDto) {
        const url = new URL('/auth/sdk', urls_contract_1.BASE_URL);
        const presetUrl = new URL('/customers/preset', urls_contract_1.BASE_URL);
        const createCustomerUrl = new URL('/customers', urls_contract_1.BASE_URL);
        const { accessToken } = await fetch(url, {
            method: http_methods_enum_1.HttpMethods.POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secret: this.secret }),
        })
            .then(async (response) => await response.json());
        const data = await fetch(presetUrl, {
            method: http_methods_enum_1.HttpMethods.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ platform: 'WEB' }),
        })
            .then(async (response) => await response.json());
        const response = await fetch(createCustomerUrl, {
            method: http_methods_enum_1.HttpMethods.PUT,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.accessToken}`,
            },
            body: JSON.stringify({
                customerUserId: createCustomerDto.customerUserId,
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
            .then(async (res) => await res.json());
        const client = new AuthenticatedClient(this.tenant, this.secret, response.accessToken);
        return client;
    }
    ;
    async request() {
        throw new unauthenticated_error_1.Unauthenticated;
    }
}
exports.Client = Client;
class AuthenticatedClient {
    constructor(tenant, secret, token) {
        this.tenant = tenant;
        this.secret = secret;
        this.token = token;
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
        if (response.status === 204) {
            return undefined;
        }
        const responseData = await response.json();
        return responseData;
    }
}
exports.AuthenticatedClient = AuthenticatedClient;
//# sourceMappingURL=client.js.map