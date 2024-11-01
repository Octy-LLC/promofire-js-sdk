"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promofire = exports.Client = void 0;
const client_1 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
const http_methods_enum_1 = require("./contracts/enums/http-methods.enum");
class Promofire {
    constructor(tenant, secret) {
        this.client = new client_1.Client(tenant, secret);
    }
    async identify(createCustomerDto) {
        this.client = await this.client.authenticate(createCustomerDto);
        return this;
    }
    async createTemplate(createTemplateDto) {
        return await this.client.request('/code-templates', http_methods_enum_1.HttpMethods.POST, createTemplateDto);
    }
    async updateTemplate(templateId, updateCodeTemplateDto) {
        return await this.client.request(`/code-templates/${templateId}`, http_methods_enum_1.HttpMethods.PATCH, updateCodeTemplateDto);
    }
    async getCampaigns(options) {
        const queryParams = new URLSearchParams(options);
        return await this.client.request(`/code-templates?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCampaignById(templateId) {
        return await this.client.request(`/code-templates/${templateId}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCurrentUserCodes(options) {
        const queryParams = new URLSearchParams(options);
        return await this.client.request(`/codes/me?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCodeByValue(codeValue) {
        return await this.client.request(`/codes/${codeValue}`, http_methods_enum_1.HttpMethods.GET);
    }
    async generateCode(createCodeDto) {
        return await this.client.request('/codes', http_methods_enum_1.HttpMethods.POST, createCodeDto);
    }
    async generateBatchCode(createCodesDto) {
        return await this.client.request('/codes/batch', http_methods_enum_1.HttpMethods.POST, createCodesDto);
    }
    async updateCode(codeValue, updateCodeDto) {
        return await this.client.request(`/codes/${codeValue}`, http_methods_enum_1.HttpMethods.PATCH, updateCodeDto);
    }
    async redeemCode(redeemCodeDto) {
        await this.client.request('/codes/redeem', http_methods_enum_1.HttpMethods.POST, redeemCodeDto);
    }
    async createCustomer(createDto) {
        const customer = await this.client.request('/customers', http_methods_enum_1.HttpMethods.PUT, createDto);
        return customer;
    }
    async getCodeRedeems(getMyRedeemedCodesDto) {
        const queryParams = new URLSearchParams(getMyRedeemedCodesDto);
        return await this.client.request(`/codes/redeems?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCurrentUserRedeems(getMyRedeemedCodesDto) {
        const queryParams = new URLSearchParams(getMyRedeemedCodesDto);
        return await this.client.request(`/codes/redeems/me?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async identifyCustomerByEmail(clientDataDto) {
        return await this.client.request('/auth/sign-in/invite/email', http_methods_enum_1.HttpMethods.POST, clientDataDto);
    }
    async identifyCustomerByGoogle(clientDataDto) {
        return await this.client.request('/auth/sign-in/invite/google', http_methods_enum_1.HttpMethods.POST, clientDataDto);
    }
    async getCurrentUser() {
        return await this.client.request('/customers/me', http_methods_enum_1.HttpMethods.GET);
    }
    async updateCurrentUser(updateMeDto) {
        return await this.client.request('/customers/me', http_methods_enum_1.HttpMethods.PATCH, updateMeDto);
    }
    async deleteMe() {
        await this.client.request('/customers/me', http_methods_enum_1.HttpMethods.DELETE);
    }
}
exports.Promofire = Promofire;
//# sourceMappingURL=index.js.map