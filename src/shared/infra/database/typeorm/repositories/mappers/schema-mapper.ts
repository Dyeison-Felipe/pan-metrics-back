export interface SchemaMapperRepository<E, Schema> {
  toSchema(entitie: E): Schema;
}