import { AuthenticatedClient, AuthenticatingClient, UnAuthenticatedClient, ClientState } from './client';
import { HttpMethods } from './contracts/enums/http-methods.enum';
import { UUID } from './contracts/utils/uuid.contract';
import { CreateCodeDto } from './dto/codes/create-code.dto';
import { CreateCodesDto } from './dto/codes/create-codes.dto';
import { RedeemCodeDto } from './dto/codes/redeem-code.dto';
import { UpdateCodeDto } from './dto/codes/update-code.dto';
import { GetMyRedeemedCodesDto } from './dto/codes/get-my-redeemed-codes.dto';
import { SearchCodeTemplatesDto } from './dto/util/search-code-templates.dto';
import { IConstructPromofire } from './contracts/promofire/construct-promofire.contract';
import { IAuthenticateClient } from './contracts/client/authenticate-client.contract';
import { GetRedeemsOfMyCodesDto } from './dto/codes/get-redeems-of-my-codes.dto';
import { PatchUpdateCustomerDto } from './dto/customers/update-customer.dto';
import { IPaginable } from './contracts/dto/paginable.contract';
import { CodesDto } from './dto/codes/paginated-codes.dto';
import { CodeDto } from './dto/codes/code.dto';
import { CodeTemplate } from './entities/code-template.entity';
import { PaginatedCodeTemplatesDto } from './dto/code-templates/paginated-code-template.dto';
import { PaginatedCodeRedeemsDto } from './dto/code-redeems/paginated-code-redeems.dto';
import { CustomerDto } from './dto/customers/customer.dto';

export { UnAuthenticatedClient as Client };

export class Promofire {
  private client: ClientState;

  constructor(options: IConstructPromofire) {
    const { secret } = options;
    const baseUrl = options.baseUrl;
    const appBuild = options.appBuild || 'unknown';
    const appVersion = options.appVersion || 'unknown';

    this.client = new UnAuthenticatedClient({ secret, appBuild, appVersion, baseUrl });
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

  async getCampaigns(options: SearchCodeTemplatesDto): Promise<PaginatedCodeTemplatesDto> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    const response = await this.client
      .request<PaginatedCodeTemplatesDto>(`/code-templates?${queryParams}`, HttpMethods.GET);

    return response as PaginatedCodeTemplatesDto;
  }

  async getCampaignById(id: UUID): Promise<CodeTemplate | null> {
    const response = await this.client
      .request<CodeTemplate | null>(`/code-templates/${id}`, HttpMethods.GET);

    return response as CodeTemplate | null;
  }

  async getMyAvailableCodes(options: IPaginable): Promise<CodesDto | null> {
    const queryParams = new URLSearchParams(options as any as Record<string, string>);
    const response = await this.client
      .request<CodesDto | null>(`/codes/me?${queryParams}`, HttpMethods.GET);

    return response as CodesDto | null;
  }

  async getCodeByValue(codeValue: string): Promise<CodeDto | null> {
    const response = await this.client
      .request<CodeDto | null>(`/codes/${codeValue}`, HttpMethods.GET);

    return response as CodeDto | null;
  }

  async generateCode(createCodeDto: CreateCodeDto): Promise<CodeDto> {
    const response = await this.client
      .request<CodeDto>('/codes', HttpMethods.POST, createCodeDto);
    return response as CodeDto;
  }

  async generateCodesBatch(createCodesDto: CreateCodesDto): Promise<CodeDto[]> {
    const response = await this.client
      .request<CodeDto[]>('/codes/batch', HttpMethods.POST, createCodesDto);

    return response as CodeDto[];
  }

  async updateCode(codeValue: string, updateCodeDto: UpdateCodeDto): Promise<CodeDto | null> {
    const response = await this.client
      .request<CodeDto>(`/codes/${codeValue}`, HttpMethods.PATCH, updateCodeDto);

    return response as CodeDto | null;
  }

  async redeemCode(codeValue: string): Promise<void | null> {
    const payload: RedeemCodeDto = { codeValue, platform: this.client.platform };
    return await this.client.request<void>('/codes/redeem', HttpMethods.POST, payload);
  }

  async getRedeemsOfMyCode(
    getMyRedeemedCodesDto: GetRedeemsOfMyCodesDto,
  ): Promise<PaginatedCodeRedeemsDto> {
    const queryParams = new URLSearchParams(getMyRedeemedCodesDto as any as Record<string, string>);
    const response = await this.client
      .request<PaginatedCodeRedeemsDto>(`/codes/redeems?${queryParams}`, HttpMethods.GET);

    return response as PaginatedCodeRedeemsDto;
  }

  async getMyRedeems(
    getMyRedeemedCodesDto: GetMyRedeemedCodesDto,
  ): Promise<PaginatedCodeRedeemsDto> {
    const queryParams = new URLSearchParams(getMyRedeemedCodesDto as any as Record<string, string>);
    const response = await this.client
      .request<PaginatedCodeRedeemsDto>(`/codes/redeems/me?${queryParams}`, HttpMethods.GET);

    return response as PaginatedCodeRedeemsDto;
  }

  async getMe(): Promise<CustomerDto> {
    const response = await this.client
      .request<CustomerDto>('/customers/me', HttpMethods.GET);

    return response as CustomerDto;
  }

  async updateMe(updateMeDto: PatchUpdateCustomerDto): Promise<CustomerDto | null> {
    const response = await this.client
      .request<CustomerDto>('/customers/me', HttpMethods.PATCH, updateMeDto);

    return response as CustomerDto | null;
  }
}
