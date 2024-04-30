"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sdk = exports.Client = void 0;
const client_1 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
const http_methods_enum_1 = require("./contracts/enums/http-methods.enum");
class Sdk {
    constructor(client) {
        this.client = client;
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
    async getMyRedeems(dateRangeDto) {
        return await this.client.request('/codes/me/redeems', http_methods_enum_1.HttpMethods.GET, {});
    }
    async getCodesByTemplate(templateId) {
        return await this.client.request(`/codes/${templateId}`, http_methods_enum_1.HttpMethods.GET, {});
    }
    async revokeCode(codeValue) {
        await this.client.request(`/codes/${codeValue}/revoke`, http_methods_enum_1.HttpMethods.DELETE, {});
    }
}
exports.Sdk = Sdk;
//# sourceMappingURL=main.js.map