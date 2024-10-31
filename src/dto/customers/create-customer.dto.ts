import { Platforms } from '../../contracts/enums/platforms.enum';

export class CreateCustomerDto {
  platform: Platforms;
  device: string;
  os: string;
  appBuild: string;
  appVersion: string;
  sdkVersion: string;
  tenantAssignedId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
