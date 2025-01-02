import { Platforms } from '../../contracts/enums/platforms.enum';

export class CreateCustomerDto {
  platform: Platforms;
  device: string;
  os: string;
  appBuild: string;
  appVersion: string;
  sdkVersion: string;
  customerUserId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
