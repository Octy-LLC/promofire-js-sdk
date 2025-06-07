"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promofire = exports.Client = void 0;
const client_1 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.UnAuthenticatedClient; } });
const http_methods_enum_1 = require("./contracts/enums/http-methods.enum");
class Promofire {
    constructor(options) {
        const { secret } = options;
        const appBuild = options.appBuild || 'unknown';
        const appVersion = options.appVersion || 'unknown';
        this.client = new client_1.UnAuthenticatedClient({ secret, appBuild, appVersion });
    }
    activate(options) {
        this.client.authenticate({ ...options })
            .then((client) => {
            const requests = this.client.requests;
            this.client = client;
            requests.forEach(req => {
                client.request(req.url, req.method, req.body)
                    .then(req.resolve, req.reject);
            });
        });
        this.client = new client_1.AuthenticatingClient(this.client);
        return this;
    }
    async createCampaign(createTemplateDto) {
        return await this.client.request('/code-templates', http_methods_enum_1.HttpMethods.POST, createTemplateDto);
    }
    async updateCampaign(templateId, updateCodeTemplateDto) {
        return await this.client.request(`/code-templates/${templateId}`, http_methods_enum_1.HttpMethods.PATCH, updateCodeTemplateDto);
    }
    async getCampaigns(options) {
        const queryParams = new URLSearchParams(options);
        return await this.client.request(`/code-templates?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCampaignById(templateId) {
        return await this.client.request(`/code-templates/${templateId}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getMyAvailableCodes(options) {
        const queryParams = new URLSearchParams(options);
        return await this.client.request(`/codes/me?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCodeByValue(codeValue) {
        return await this.client.request(`/codes/${codeValue}`, http_methods_enum_1.HttpMethods.GET);
    }
    async generateCode(createCodeDto) {
        return await this.client.request('/codes', http_methods_enum_1.HttpMethods.POST, createCodeDto);
    }
    async generateCodesBatch(createCodesDto) {
        return await this.client.request('/codes/batch', http_methods_enum_1.HttpMethods.POST, createCodesDto);
    }
    async updateCode(codeValue, updateCodeDto) {
        return await this.client.request(`/codes/${codeValue}`, http_methods_enum_1.HttpMethods.PATCH, updateCodeDto);
    }
    async redeemCode(redeemCodeDto) {
        await this.client.request('/codes/redeem', http_methods_enum_1.HttpMethods.POST, redeemCodeDto);
    }
    async getRedeemsOfMyCode(getMyRedeemedCodesDto) {
        const queryParams = new URLSearchParams(getMyRedeemedCodesDto);
        return await this.client.request(`/codes/redeems?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getMyRedeems(getMyRedeemedCodesDto) {
        const queryParams = new URLSearchParams(getMyRedeemedCodesDto);
        return await this.client.request(`/codes/redeems/me?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getMe() {
        return await this.client.request('/customers/me', http_methods_enum_1.HttpMethods.GET);
    }
    async updateMe(updateMeDto) {
        return await this.client.request('/customers/me', http_methods_enum_1.HttpMethods.PATCH, updateMeDto);
    }
    async deleteMe() {
        await this.client.request('/customers/me', http_methods_enum_1.HttpMethods.DELETE);
    }
}
exports.Promofire = Promofire;
//# sourceMappingURL=index.js.map