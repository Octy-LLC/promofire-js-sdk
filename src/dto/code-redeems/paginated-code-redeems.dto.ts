import { CodeRedeem } from '../../entities/code-redeem.entity';

export class PaginatedCodeRedeemsDto {
  total: number;
  redeems: CodeRedeem[];
}
