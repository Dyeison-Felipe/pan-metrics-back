// src/shared/infra/enums/casl.enum.ts
export enum Action {
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export enum Subject {
  Product = 'Product',
  User = 'User',
  All = 'all', // wildcard — admin pode tudo
}