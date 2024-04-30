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
    async authenticate(userId) {
        const url = new URL('/auth/sign-in/sdk', urls_contract_1.BASE_URL);
        const { accessToken } = await fetch(url, {
            method: http_methods_enum_1.HttpMethods.POST,
            body: JSON.stringify({ tenant: this.tenant, secret: this.secret, sub: userId }),
        })
            .then(async (response) => await response.json());
        const client = new AuthenticatedClient(this.tenant, this.secret, accessToken);
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
    request(path, method, body) {
        const url = new URL(path, urls_contract_1.BASE_URL);
        const request = fetch(url, {
            headers: { 'Authorization': `Bearer ${this.token}` },
            method,
            body: JSON.stringify(body),
        })
            .then(async (response) => await response.json());
        return request;
    }
}
exports.AuthenticatedClient = AuthenticatedClient;
//# sourceMappingURL=client.js.map