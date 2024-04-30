import { IPaginable } from '../../contracts/dto/paginable.contract';
import { CodeTemplateStatuses } from '../../contracts/enums/code-template-statuses.enum';
export declare class SearchCodeTemplatesDto implements IPaginable {
    name?: string;
    status?: CodeTemplateStatuses;
    isUsableByCustomers?: boolean;
    limit: number;
    offset: number;
}
