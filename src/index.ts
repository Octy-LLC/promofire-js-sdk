import { CodeTemplate } from './aggregates/code-template.aggregate';
import { Client } from './client';
import { IAuthTokens } from './contracts/auth/auth-tokens.contract';
import { IClientState } from './contracts/client/client-state.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { UUID } from './contracts/utils/uuid.contract';
import { CreateCodeDto } from './dto/codes/create-code.dto';
import { CreateCodesDto } from './dto/codes/create-codes.dto';
import { FilterCodeDto } from './dto/codes/filter-code.dto';
import { RedeemCodeDto } from './dto/codes/redeem-code.dto';
import { UpdateCodeDto } from './dto/codes/update-code.dto';
import { CreateCustomerDto } from './dto/customers/create-customer.dto';
import { DateRange } from './dto/util/date-range.dto';
import { SearchCodeTemplatesDto } from './dto/util/search-code-templates.dto';
import { CodeRedeem } from './entities/code-redeem.entity';
import { Code } from './entities/code.entity';

export { Client };

export class Promofire {
  private client: IClientState;

  constructor(tenant: string, secret: string) {
    this.client = new Client(tenant, secret);
  }

  async identify(userId: string): Promise<Promofire> {
    this.client = await this.client.authenticate(userId);
    return this;
  }

  async getTemplates(options: SearchCodeTemplatesDto): Promise<CodeTemplate[]> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodeTemplate[]>(`/api/code-templates?${queryParams}`, HttpMethods.GET);
  }

  async getTemplateById(templateId: UUID): Promise<CodeTemplate | null> {
    return await this.client.request<CodeTemplate | null>(`/api/code-templates/${templateId}`, HttpMethods.GET);
  }

  async getCodes(options: FilterCodeDto): Promise<Code[] | null> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<Code[] | null>(`/api/codes?${queryParams}`, HttpMethods.GET);
  }

  async getCodeByValue(codeValue: string): Promise<Code | null> {
    return await this.client.request<Code | null>(`/api/codes/${codeValue}`, HttpMethods.GET);
  }

  async createCode(createCodeDto: CreateCodeDto): Promise<Code> {
    return await this.client.request<Code>('/api/codes', HttpMethods.POST, createCodeDto);
  }

  async createBatchCode(createCodesDto: CreateCodesDto): Promise<Code[]> {
    return await this.client.request<Code[]>('/api/codes/batch', HttpMethods.POST, createCodesDto);
  }

  async updateCode(updateCodeDto: UpdateCodeDto): Promise<Code> {
    return await this.client.request<Code>('/api/codes', HttpMethods.PATCH, updateCodeDto);
  }

  async redeemCode(redeemCodeDto: RedeemCodeDto): Promise<void> {
    await this.client.request<void>('/api/codes/redeem', HttpMethods.POST, redeemCodeDto);
  }

  async getCodesByTemplate(templateId: string): Promise<Code[]> {
    return await this.client.request<Code[]>(`/api/codes/${templateId}`, HttpMethods.GET);
  }

  async filterCodes(filterDto: FilterCodeDto): Promise<Code[]> {
    const queryParams = new URLSearchParams(filterDto as unknown as Record<string, string>).toString();
    return await this.client.request<Code[]>(`/api/codes/filter?${queryParams}`, HttpMethods.GET);
  }

  async createCustomer(createDto: CreateCustomerDto): Promise<IAuthTokens> {
    return await this.client.request<IAuthTokens>('/api/customers', HttpMethods.PUT, createDto);
  }

  async getMyRedeemedCodes(dataRange: DateRange): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(dataRange as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/api/code-redeems?${queryParams}`, HttpMethods.GET);
  }

  async getCodeRedeemesOwnedByMe(dataRange: DateRange): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(dataRange as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/api/codes/me/redeems?${queryParams}`, HttpMethods.GET);
  }

  async getCodeRedeemesRedeemedByCustomer(customerId: UUID, dataRange: DateRange): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(dataRange as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/api/codes-redeems/redeemed-by/${customerId}?${queryParams}`, HttpMethods.GET);
  }

  async deleteMe(): Promise<void> {
    await this.client.request<void>(`/api/customers`, HttpMethods.DELETE);
  }
}
