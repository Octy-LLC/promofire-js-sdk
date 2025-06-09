import { CodeTemplate } from '../../entities/code-template.entity';

export class PaginatedCodeTemplatesDto {
  total: number;
  templates: CodeTemplate[];
}