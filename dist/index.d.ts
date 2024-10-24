import { CodeTemplate, CodeTemplatesDto } from './aggregates/code-template.aggregate';
import { Client } from './client';
import { IAuthTokens } from './contracts/auth/auth-tokens.contract';
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
export declare class Promofire {
    private client;
    constructor(tenant: string, secret: string);
    identify(): Promise<Promofire>;
    createTemplate(createTemplateDto: CreateCodeTemplateDto): Promise<CodeTemplate>;
    updateTemplate(templateId: UUID, updateCodeTemplateDto: UpdateCodeTemplateDto): Promise<CodeTemplate>;
    getTemplates(options: SearchCodeTemplatesDto): Promise<CodeTemplatesDto>;
    getTemplateById(templateId: UUID): Promise<CodeTemplate | null>;
    getCodes(options: FilterCodeDto): Promise<CodesDto | null>;
    getCodeByValue(codeValue: string): Promise<Code | null>;
    createCode(createCodeDto: CreateCodeDto): Promise<Code>;
    createBatchCode(createCodesDto: CreateCodesDto): Promise<Code[]>;
    updateCode(codeValue: string, updateCodeDto: UpdateCodeDto): Promise<Code>;
    redeemCode(redeemCodeDto: RedeemCodeDto): Promise<void>;
    createCustomer(createDto: CreateCustomerDto): Promise<IAuthTokens>;
    getMyRedeemedCodes(dataRange: DateRange): Promise<CodeRedeem[]>;
    getCodeRedeemesOwnedByMe(dataRange: DateRange): Promise<CodeRedeem[]>;
    getCodeRedeemesRedeemedByCustomer(customerId: UUID, dataRange: DateRange): Promise<CodeRedeem[]>;
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
    deleteMe(): Promise<void>;
}
