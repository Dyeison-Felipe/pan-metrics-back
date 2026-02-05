export interface EntityMapperRepository<Schema, E> {
  toEntity(schema: Schema): E;
}