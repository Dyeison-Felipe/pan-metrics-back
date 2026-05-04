import { AddressEntity } from '@/core/address/domain/entities/address.entity';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

type CompanyProps = {
  fantasyName: string;
  socialReazon: string;
  cnpj: string;
  email: string;
  phoneNumber: string;
  logotipo: string;
  active: boolean;
  address: AddressEntity;
};

export interface CompanyEntity extends CompanyProps {}

@Data()
export class CompanyEntity extends BaseEntity<CompanyProps> {
  protected validate(): void {
    throw new Error('Method not implemented.');
  }
}
