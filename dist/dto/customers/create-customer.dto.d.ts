import { UUID } from '../../contracts/utils/uuid.contract';
import { Platforms } from '../../contracts/enums/platforms.enum';
export declare class CreateCustomerDto {
    tenant: string;
    country: string;
    platform: Platforms;
    device: string;
    os: string;
    appBuild: string;
    appVersion: string;
    sdkVersion: string;
    id?: UUID;
    tenantAssignedId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}
