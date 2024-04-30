import { AuthProviders } from 'src/contracts/enums/auth-providers.enum';
import { NonOwnerEmployeeTypes } from 'src/contracts/employee/non-owner-employee-types.enum';
export declare class CreateEmployeeDto {
    tenant: string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    provider: AuthProviders;
    type: NonOwnerEmployeeTypes;
}
