import { IPaginable } from '../../contracts/dto/paginable.contract';

export class SearchCodeTemplatesDto implements IPaginable {
  limit: number;
  offset: number;
}
