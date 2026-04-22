import { FieldsError } from "../validators/validator-field.interface";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsError) {
    super('Entity Validation Error');
    this.name = 'EntityValidationError';
  }
}
