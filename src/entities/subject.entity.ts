import { AuthProviders } from '../contracts/enums/auth-providers.enum';
import { Employee } from './employee.entity';

export class Subject {
  id: number;
  sub: string;
  provider: AuthProviders;
  employee: Employee;
}
