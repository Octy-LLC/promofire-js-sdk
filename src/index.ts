import { CodeTemplate, CodeTemplatesDto } from './entities/code-template.entity';
import { AuthenticatedClient, AuthenticatingClient, UnAuthenticatedClient, ClientState } from './client';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { UUID } from './contracts/utils/uuid.contract';
import { CreateCodeTemplateDto } from './dto/code-templates/create-code-template.dto';
import { UpdateCodeTemplateDto } from './dto/code-templates/update-code-template.dto';
import { CreateCodeDto } from './dto/codes/create-code.dto';
import { CreateCodesDto } from './dto/codes/create-codes.dto';
import { RedeemCodeDto } from './dto/codes/redeem-code.dto';
import { UpdateCodeDto } from './dto/codes/update-code.dto';
import { GetMyRedeemedCodesDto } from './dto/codes/get-my-redeemed-codes.dto';
import { SearchCodeTemplatesDto } from './dto/util/search-code-templates.dto';
import { CodeRedeem } from './entities/code-redeem.entity';
import { Code, CodesDto } from './entities/code.entity';
import { IConstructPromofire } from './contracts/promofire/construct-promofire.contract';
import { IAuthenticateClient } from './contracts/client/authenticate-client.contract';
import { GetRedeemsOfMyCodesDto } from './dto/codes/get-redeems-of-my-codes.dto';
import { PatchUpdateCustomerDto } from './dto/customers/update-customer.dto';

export { UnAuthenticatedClient as Client };

export class Promofire {
  private client: ClientState;

  constructor(options: IConstructPromofire) {
    const { secret } = options;
    const appBuild = options.appBuild || 'unknown';
    const appVersion = options.appVersion || 'unknown';

    this.client = new UnAuthenticatedClient({ secret, appBuild, appVersion });
  }

  activate(options?: IAuthenticateClient): Promofire {
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

  async createCampaign(createTemplateDto: CreateCodeTemplateDto): Promise<CodeTemplate> {
    return await this.client.request<CodeTemplate>('/code-templates', HttpMethods.POST, createTemplateDto);
  }

  async updateCampaign(templateId: UUID, updateCodeTemplateDto: UpdateCodeTemplateDto): Promise<CodeTemplate> {
    return await this.client.request<CodeTemplate>(`/code-templates/${templateId}`, HttpMethods.PATCH, updateCodeTemplateDto);
  }

  async getCampaigns(options: SearchCodeTemplatesDto): Promise<CodeTemplatesDto> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodeTemplatesDto>(`/code-templates?${queryParams}`, HttpMethods.GET);
  }

  async getCampaignById(templateId: UUID): Promise<CodeTemplate | null> {
    return await this.client.request<CodeTemplate | null>(`/code-templates/${templateId}`, HttpMethods.GET);
  }

  async getMyAvailableCodes(options: { limit: number, offset: number }): Promise<CodesDto | null> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    return await this.client.request<CodesDto | null>(`/codes/me?${queryParams}`, HttpMethods.GET);
  }

  async getCodeByValue(codeValue: string): Promise<Code | null> {
    return await this.client.request<Code | null>(`/codes/${codeValue}`, HttpMethods.GET);
  }

  async generateCode(createCodeDto: CreateCodeDto): Promise<Code> {
    return await this.client.request<Code>('/codes', HttpMethods.POST, createCodeDto);
  }

  async generateCodesBatch(createCodesDto: CreateCodesDto): Promise<Code[]> {
    return await this.client.request<Code[]>('/codes/batch', HttpMethods.POST, createCodesDto);
  }

  async updateCode(codeValue: string, updateCodeDto: UpdateCodeDto): Promise<Code> {
    return await this.client.request<Code>(`/codes/${codeValue}`, HttpMethods.PATCH, updateCodeDto);
  }

  async redeemCode(redeemCodeDto: RedeemCodeDto): Promise<void> {
    await this.client.request<void>('/codes/redeem', HttpMethods.POST, redeemCodeDto);
  }

  async getRedeemsOfMyCode(getMyRedeemedCodesDto: GetRedeemsOfMyCodesDto): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(getMyRedeemedCodesDto as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/codes/redeems?${queryParams}`, HttpMethods.GET);
  }

  async getMyRedeems(getMyRedeemedCodesDto: GetMyRedeemedCodesDto): Promise<CodeRedeem[]> {
    const queryParams = new URLSearchParams(getMyRedeemedCodesDto as any as Record<string, string>);
    return await this.client.request<CodeRedeem[]>(`/codes/redeems/me?${queryParams}`, HttpMethods.GET);
  }

  async getMe(): Promise<any> {
    return await this.client.request('/customers/me', HttpMethods.GET);
  }

  async updateMe(updateMeDto: PatchUpdateCustomerDto): Promise<any> {
    return await this.client.request('/customers/me', HttpMethods.PATCH, updateMeDto);
  }
}
