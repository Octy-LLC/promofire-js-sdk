import { AuthenticatedClient, Client } from './client';
import { CreateCodeDto } from './dto/codes/create-code.dto';
import { CreateCodesDto } from './dto/codes/create-codes.dto';
import { RedeemCodeDto } from './dto/codes/redeem-code.dto';
import { UpdateCodeDto } from './dto/codes/update-code.dto';
import { DateRange } from './dto/util/date-range.dto';
import { CodeRedeem } from './entities/code-redeem.entity';
import { Code } from './entities/code.entity';
export { Client };
export declare class Sdk {
    private client;
    constructor(client: AuthenticatedClient);
    createCode(createCodeDto: CreateCodeDto): Promise<Code>;
    createBatchCode(createCodesDto: CreateCodesDto): Promise<Code[]>;
    updateCode(updateCodeDto: UpdateCodeDto): Promise<Code>;
    redeemCode(redeemCodeDto: RedeemCodeDto): Promise<void>;
    getMyRedeems(dateRangeDto: DateRange): Promise<CodeRedeem[]>;
    getCodesByTemplate(templateId: number): Promise<Code[]>;
    revokeCode(codeValue: string): Promise<void>;
}
