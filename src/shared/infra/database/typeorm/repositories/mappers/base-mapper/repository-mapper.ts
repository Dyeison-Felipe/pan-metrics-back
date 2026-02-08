import { BaseEntity, BaseProps } from '../../../../../../domain/entity/baseEntity';
import { EntityMapperRepository } from './entity-mapper';
import { SchemaMapperRepository } from './schema-mapper';

export interface RepositoryMapper<Schema, E extends BaseEntity<BaseProps>>
  extends
    EntityMapperRepository<Schema, E>,
    SchemaMapperRepository<E, Schema> {}
