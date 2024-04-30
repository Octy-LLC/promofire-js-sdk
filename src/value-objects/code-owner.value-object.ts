import { UUID } from '../contracts/utils/uuid.contract';

import { Customer } from '../entities/customer.entity';
import { Employee } from '../entities/employee.entity';
import { Code } from '../entities/code.entity';

export class CodeOwner {
  id: UUID;
  customer: Customer;
  employee: Employee;
  code: Code;
}
