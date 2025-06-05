import { CodeTemplate, CodeTemplatesDto } from './aggregates/code-template.aggregate';
import { AuthenticatedClient, AuthenticatingClient, Client, ClientState } from './client';
import { IAuthTokens } from './contracts/auth/auth-tokens.contract';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { UUID } from './contracts/utils/uuid.contract';
import { CreateCodeTemplateDto } from './dto/code-templates/create-code-template.dto';
import { UpdateCodeTemplateDto } from './dto/code-templates/update-code-template.dto';
import { CreateCodeDto } from './dto/codes/create-code.dto';
import { CreateCodesDto } from './dto/codes/create-codes.dto';
import { RedeemCodeDto } from './dto/codes/redeem-code.dto';
import { UpdateCodeDto } from './dto/codes/update-code.dto';
import { CreateCustomerDto } from './dto/customers/create-customer.dto';
import { GetMyRedeemedCodesDto } from './dto/util/get-my-redeemed-codes.dto';
import { SearchCodeTemplatesDto } from './dto/util/search-code-templates.dto';
import { CodeRedeem } from './entities/code-redeem.entity';
import { Code, CodesDto } from './entities/code.entity';
import { IConstructPromofire } from './contracts/promofire/construct-promofire.contract';
import { IAuthenticateClient } from './contracts/client/authenticate-client.contract';

export { Client };

export class Promofire {
  private client: ClientState;

  constructor(options: IConstructPromofire) {
    const { secret } = options;
    const appBuild = options.appBuild || 'unknown';
    const appVersion = options.appVersion || 'unknown';

    this.client = new Client({ secret, appBuild, appVersion });
  }

  /**
   * Would create anonymous user.
   */
  anonify(): Promofire {
    this.client.authenticate({})
      .then((client: AuthenticatedClient) => {
        const requests = (this.client as AuthenticatingClient).requests;
        this.client = client;

        requests.forEach(req => {
          client.request(req.url, req.method, req.body)
            .then(req.resolve, req.reject);
        });
      });

    this.client = new AuthenticatingClient(this.client as any);

    return this;
  }

  /**
   * Inserts or updates existing customer in Promofire.
   */
  identify(options: IAuthenticateClient): Promofire {
    this.client.authenticate({ ...options })
      .then((client: AuthenticatedClient) => {
        const requests = (this.client as AuthenticatingClient).requests;
        this.client = client;

        requests.forEach(req => {
          client.request(req.url, req.method, req.body)
            .then(req.resolve, req.reject);
        });
      });

    this.client = new AuthenticatingClient(this.client as any);

    return this;
  }

  async createTemplate(createTemplateDto: CreateCodeTemplateDto): Promise<CodeTemplate> {
    return await this.client.request<CodeTemplate>('/code-templates', HttpMethods.POST, createTemplateDto);
  }

  async updateTemplate(templateId: UUID, updateCodeTemplateDto: UpdateCodeTemplateDto): Promise<CodeTemplate> {
    return await this.client.request<CodeTemplate>(`/code-templates/${templateId}`, HttpMethods.PATCH, updateCodeTemplateDto);
  }

  async getCampaigns(options: SearchCodeTemplatesDto): Promise<CodeTemplatesDto> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodeTemplatesDto>(`/code-templates?${queryParams}`, HttpMethods.GET);
  }

  async getCampaignById(templateId: UUID): Promise<CodeTemplate | null> {
    return await this.client.request<CodeTemplate | null>(`/code-templates/${templateId}`, HttpMethods.GET);
  }

  async getCurrentUserCodes(options: { limit: number, offset: number }): Promise<CodesDto | null> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodesDto | null>(`/codes/me?${queryParams}`, HttpMethods.GET);
  }

  async getCodeByValue(codeValue: string): Promise<Code | null> {
    return await this.client.request<Code | null>(`/codes/${codeValue}`, HttpMethods.GET);
  }

  async generateCode(createCodeDto: CreateCodeDto): Promise<Code> {
    return await this.client.request<Code>('/codes', HttpMethods.POST, createCodeDto);
  }

  async generateBatchCode(createCodesDto: CreateCodesDto): Promise<Code[]> {
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

  async getCodeRedeems(getMyRedeemedCodesDto: GetMyRedeemedCodesDto): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(getMyRedeemedCodesDto as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/codes/redeems?${queryParams}`, HttpMethods.GET);
  }

  async getCurrentUserRedeems(getMyRedeemedCodesDto: GetMyRedeemedCodesDto): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(getMyRedeemedCodesDto as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/codes/redeems/me?${queryParams}`, HttpMethods.GET);
  }

  async identifyCustomerByEmail(clientDataDto: { email: string, firstName: string, lastName: string, inviteToken: string }) {
    return await this.client.request('/auth/sign-in/invite/email', HttpMethods.POST, clientDataDto);
  }

  async identifyCustomerByGoogle(clientDataDto: { code: string, inviteToken: string }) {
    return await this.client.request('/auth/sign-in/invite/google', HttpMethods.POST, clientDataDto);
  }

  async getCurrentUser(): Promise<any> {
    return await this.client.request('/customers/me', HttpMethods.GET);
  }

  async updateCurrentUser(updateMeDto: {
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string
  }): Promise<any> {
    return await this.client.request('/customers/me', HttpMethods.PATCH, updateMeDto);
  }

  async deleteMe(): Promise<void> {
    await this.client.request<void>('/customers/me', HttpMethods.DELETE);
  }
}
