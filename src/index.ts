import { CodeTemplate, CodeTemplatesDto } from './aggregates/code-template.aggregate';
import { Client } from './client';
import { IAuthTokens } from './contracts/auth/auth-tokens.contract';
import { IClientState } from './contracts/client/client-state.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { UUID } from './contracts/utils/uuid.contract';
import { CreateCodeTemplateDto } from './dto/code-templates/create-code-template.dto';
import { UpdateCodeTemplateDto } from './dto/code-templates/update-code-template.dto';
import { CreateCodeDto } from './dto/codes/create-code.dto';
import { CreateCodesDto } from './dto/codes/create-codes.dto';
import { FilterCodeDto } from './dto/codes/filter-code.dto';
import { RedeemCodeDto } from './dto/codes/redeem-code.dto';
import { UpdateCodeDto } from './dto/codes/update-code.dto';
import { CreateCustomerDto } from './dto/customers/create-customer.dto';
import { DateRange } from './dto/util/date-range.dto';
import { SearchCodeTemplatesDto } from './dto/util/search-code-templates.dto';
import { CodeRedeem } from './entities/code-redeem.entity';
import { Code, CodesDto } from './entities/code.entity';

export { Client };

export class Promofire {
  private client: IClientState;

  constructor(tenant: string, secret: string) {
    this.client = new Client(tenant, secret);
  }

  async identify(): Promise<Promofire> {
    this.client = await this.client.authenticate();
    console.log('Client: ', this.client);
    return this;
  }

  async createTemplate(createTemplateDto: CreateCodeTemplateDto): Promise<CodeTemplate> {
    return await this.client.request<CodeTemplate>('/code-templates', HttpMethods.POST, createTemplateDto);
  }

  async updateTemplate(templateId: UUID, updateCodeTemplateDto: UpdateCodeTemplateDto): Promise<CodeTemplate> {
    return await this.client.request<CodeTemplate>(`/code-templates/${templateId}`, HttpMethods.PATCH, updateCodeTemplateDto);
  }

  async getTemplates(options: SearchCodeTemplatesDto): Promise<CodeTemplatesDto> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodeTemplatesDto>(`/code-templates?${queryParams}`, HttpMethods.GET);
  }

  async getTemplateById(templateId: UUID): Promise<CodeTemplate | null> {
    return await this.client.request<CodeTemplate | null>(`/code-templates/${templateId}`, HttpMethods.GET);
  }

  async getCodes(options: FilterCodeDto): Promise<CodesDto | null> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodesDto | null>(`/codes?${queryParams}`, HttpMethods.GET);
  }

  async getCodeByValue(codeValue: string): Promise<Code | null> {
    return await this.client.request<Code | null>(`/codes/${codeValue}`, HttpMethods.GET);
  }

  async createCode(createCodeDto: CreateCodeDto): Promise<Code> {
    return await this.client.request<Code>('/codes', HttpMethods.POST, createCodeDto);
  }

  async createBatchCode(createCodesDto: CreateCodesDto): Promise<Code[]> {
    return await this.client.request<Code[]>('/codes/batch', HttpMethods.POST, createCodesDto);
  }

  async updateCode(codeValue: string, updateCodeDto: UpdateCodeDto): Promise<Code> {
    return await this.client.request<Code>(`/codes/${codeValue}`, HttpMethods.PATCH, updateCodeDto);
  }

  async redeemCode(redeemCodeDto: RedeemCodeDto): Promise<void> {
    await this.client.request<void>('/codes/redeem', HttpMethods.POST, redeemCodeDto);
  }

  async createCustomer(createDto: CreateCustomerDto): Promise<IAuthTokens> {
    const customer = await this.client.request<IAuthTokens>('/customers', HttpMethods.PUT, createDto);
    return customer;
  }

  async getMyRedeemedCodes(dataRange: DateRange): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(dataRange as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/code-redeems?${queryParams}`, HttpMethods.GET);
  }

  async getCodeRedeemesOwnedByMe(dataRange: DateRange): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(dataRange as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/code-redeems/me?${queryParams}`, HttpMethods.GET);
  }

  async getCodeRedeemesRedeemedByCustomer(customerId: UUID, dataRange: DateRange): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(dataRange as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/code-redeems/redeemed-by/${customerId}?${queryParams}`, HttpMethods.GET);
  }

  async identifyCustomerByEmail(clientDataDto: { email: string, firstName: string, lastName: string, inviteToken: string }) {
    return await this.client.request('/auth/sign-in/invite/email', HttpMethods.POST, clientDataDto);
  }

  async identifyCustomerByGoogle(clientDataDto: { code: string, inviteToken: string }) {
    return await this.client.request('/auth/sign-in/invite/google', HttpMethods.POST, clientDataDto);
  }

  async deleteMe(): Promise<void> {
    await this.client.request<void>('/customers', HttpMethods.DELETE);
  }
}
