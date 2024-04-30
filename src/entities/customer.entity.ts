import { UUID } from '../contracts/utils/uuid.contract';

import { Platforms } from '../contracts/enums/platforms.enum';
import { CodeRedeem } from './code-redeem.entity';
import { CodeOwner } from '../value-objects/code-owner.value-object';

export class Customer {
  id: UUID;
  tenantAssignedId?: string;
  country: string;
  platform: Platforms;
  device: string;
  os: string;
  appBuild: string;
  appVersion: string;
  sdkVersion: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  lastSession: string;
  codeRedeems: CodeRedeem[];
  codeOwner: CodeOwner;
}
