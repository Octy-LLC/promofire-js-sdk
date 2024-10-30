import { CodeTemplate, CodeTemplatesDto } from './aggregates/code-template.aggregate';
import { Client } from './client';
import { IAuthTokens } from './contracts/auth/auth-tokens.contract';
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
export { Client };
export declare class Promofire {
    private client;
    constructor(tenant: string, secret: string);
    identify(createCustomerDto: CreateCustomerDto): Promise<Promofire>;
    createTemplate(createTemplateDto: CreateCodeTemplateDto): Promise<CodeTemplate>;
    updateTemplate(templateId: UUID, updateCodeTemplateDto: UpdateCodeTemplateDto): Promise<CodeTemplate>;
    getCampaigns(options: SearchCodeTemplatesDto): Promise<CodeTemplatesDto>;
    getCampaignById(templateId: UUID): Promise<CodeTemplate | null>;
    getCurrentUserCodes(options: {
        limit: number;
        offset: number;
    }): Promise<CodesDto | null>;
    getCodeByValue(codeValue: string): Promise<Code | null>;
    generateCode(createCodeDto: CreateCodeDto): Promise<Code>;
    generateBatchCode(createCodesDto: CreateCodesDto): Promise<Code[]>;
    updateCode(codeValue: string, updateCodeDto: UpdateCodeDto): Promise<Code>;
    redeemCode(redeemCodeDto: RedeemCodeDto): Promise<void>;
    createCustomer(createDto: CreateCustomerDto): Promise<IAuthTokens>;
    getCodeRedeems(getMyRedeemedCodesDto: GetMyRedeemedCodesDto): Promise<CodeRedeem[]>;
    getCurrentUserRedeems(getMyRedeemedCodesDto: GetMyRedeemedCodesDto): Promise<CodeRedeem[]>;
    identifyCustomerByEmail(clientDataDto: {
        email: string;
        firstName: string;
        lastName: string;
        inviteToken: string;
    }): Promise<any>;
    identifyCustomerByGoogle(clientDataDto: {
        code: string;
        inviteToken: string;
    }): Promise<any>;
    getCurrentUser(): Promise<any>;
    updateCurrentUser(updateMeDto: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
    }): Promise<any>;
    deleteMe(): Promise<void>;
}
