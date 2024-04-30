import { UUID } from '../contracts/utils/uuid.contract';

import { Subject } from './subject.entity';
import { EmployeeTypes } from '../contracts/employee/employee-types.enum';
import { CodeOwner } from '../value-objects/code-owner.value-object';

export class Employee {
  id: UUID;
  subject: Subject;
  firstName: string;
  lastName: string;
  email: string;
  type: EmployeeTypes;
  codeOwner: CodeOwner;
}
