import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { Pagination } from '@/shared/domain/pagination/pagination';
import { MetaPresenter, PaginationPresenter } from '@/shared/infra/presenter/pagination/pagination.presenter';
import { PaginationDto, SortDirection } from '@/shared/infra/dto/pagination.dto';

 
export async function paginateQuery<T extends ObjectLiteral = ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  pagination: PaginationDto,
  alias?: string,
): Promise<Pagination<T>> {
  const page = pagination.page ?? 1;
  const limit = pagination.limit ?? 10;
  const direction = pagination.direction ?? SortDirection.ASC;
 
  // Aplica ordenação se um campo foi informado
  if (pagination.field) {
    const entity = alias ?? queryBuilder.alias;
    queryBuilder.orderBy(`${entity}.${pagination.field}`, direction);
  }
 
  const [items, totalItems] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();
 
  const totalPages = Math.ceil(totalItems / limit);
 
  const meta = new MetaPresenter(
    totalItems,
    items.length,
    limit,
    totalPages,
    page,
  );
 
  return new PaginationPresenter<T>(items, meta);
}