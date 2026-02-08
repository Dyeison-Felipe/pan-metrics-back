export interface SchemaMapperRepository<E, Schema> {
  toSchema(entity: E): Schema;
}