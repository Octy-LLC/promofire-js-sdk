import { CreateCustomerDto } from './create-customer.dto';
export declare class PatchUpdateCustomerDto implements Partial<Omit<CreateCustomerDto, 'platform' | 'device' | 'os' | 'appBuild' | 'appVersion' | 'sdkVersion' | 'customerUserId'>> {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}
