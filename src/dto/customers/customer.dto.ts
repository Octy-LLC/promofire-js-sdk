import { UUID } from '../../contracts/utils/uuid.contract';
import { Platforms } from '../../contracts/enums/platforms.enum';

export class CustomerDto {
  id: UUID;
  customerUserId: string | null;
  country: string | null;
  platform: Platforms;
  device: string | null;
  os: string | null;
  appBuild: string | null;
  appVersion: string | null;
  sdkVersion: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  lastSession: string;
  description: string | null;
  codeOwnerId: UUID;
}