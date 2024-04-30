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
    async identify(userId) {
        this.client = await this.client.authenticate(userId);
        return this;
    }
    async getTemplates(options) {
        const queryParams = new URLSearchParams(options);
        return await this.client.request(`/code-templates?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getTemplateById(templateId) {
        return await this.client.request(`/code-templates/${templateId}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCodes(options) {
        const queryParams = new URLSearchParams(options);
        return await this.client.request(`/codes?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCodeByValue(codeValue) {
        return await this.client.request(`/codes/${codeValue}`, http_methods_enum_1.HttpMethods.GET);
    }
    async createCode(createCodeDto) {
        return await this.client.request('/codes', http_methods_enum_1.HttpMethods.POST, createCodeDto);
    }
    async createBatchCode(createCodesDto) {
        return await this.client.request('/codes/batch', http_methods_enum_1.HttpMethods.POST, createCodesDto);
    }
    async updateCode(updateCodeDto) {
        return await this.client.request('/codes', http_methods_enum_1.HttpMethods.PATCH, updateCodeDto);
    }
    async redeemCode(redeemCodeDto) {
        await this.client.request('/codes/redeem', http_methods_enum_1.HttpMethods.POST, redeemCodeDto);
    }
    async getCodesByTemplate(templateId) {
        return await this.client.request(`/codes/${templateId}`, http_methods_enum_1.HttpMethods.GET);
    }
    async filterCodes(filterDto) {
        const queryParams = new URLSearchParams(filterDto).toString();
        return await this.client.request(`/codes/filter?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async createCustomer(createDto) {
        return await this.client.request('/customers', http_methods_enum_1.HttpMethods.PUT, createDto);
    }
    async getMyRedeemedCodes(dataRange) {
        const queryParams = new URLSearchParams(dataRange);
        return await this.client.request(`/code-redeems?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCodeRedeemesOwnedByMe(dataRange) {
        const queryParams = new URLSearchParams(dataRange);
        return await this.client.request(`/codes/me/redeems?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async getCodeRedeemesRedeemedByCustomer(customerId, dataRange) {
        const queryParams = new URLSearchParams(dataRange);
        return await this.client.request(`/codes-redeems/redeemed-by/${customerId}?${queryParams}`, http_methods_enum_1.HttpMethods.GET);
    }
    async deleteMe() {
        await this.client.request(`/customers`, http_methods_enum_1.HttpMethods.DELETE);
    }
}
exports.Promofire = Promofire;
//# sourceMappingURL=index.js.map