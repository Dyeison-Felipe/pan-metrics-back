import { AddressEntity } from '@/core/address/domain/entities/address.entity';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/base-entity';
import { CompanyValidatorFactory } from '../validators/company-validator';
import { EntityValidationError } from '@/shared/application/errors/validation-error';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';

export type CompanyProps = {
  fantasyName: string;
  socialReazon: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  logotipo: string;
  active: boolean;
  address: AddressEntity;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};

type CreateCompanyProps = {
  fantasyName: string;
  socialReazon: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  address: AddressEntity;
  createdBy: string;
  updatedBy: string;
};

type UpdateCompanyProps = {
  fantasyName: string;
  socialReazon: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  address: AddressEntity;
  updatedBy: string;
};

export interface CompanyEntity extends CompanyProps {}

@Data()
export class CompanyEntity extends BaseEntity<CompanyProps> {
  static create(props: CreateCompanyProps): CompanyEntity {
    return new CompanyEntity({
      id: crypto.randomUUID(),
      fantasyName: props.fantasyName,
      socialReazon: props.socialReazon,
      cnpj: props.cnpj,
      email: props.email,
      active: true,
      logotipo: 'teste',
      phoneNumber: props.phoneNumber,
      address: props.address,
      createdBy: props.createdBy ?? ID_USER_DEFAULT,
      updatedBy: props.updatedBy ?? ID_USER_DEFAULT,
    });
  }

  update(props: UpdateCompanyProps): void {
    this.fantasyName = props.fantasyName;
    this.socialReazon = props.socialReazon;
    this.cnpj = props.cnpj;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.updatedBy = props.updatedBy;
    this.updateTimestamp();
  }

  protected validate(): void {
    const validator = CompanyValidatorFactory.create();

    const isValid = validator.validate(this.props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
