import { Company } from '@/core/company/domain/entities/company.entity';
import { CompanySchema } from '../schema/company.schema';
import { AddressRepositoryMapper } from '@/core/address/infra/database/typeorm/repository/mapper/address-repository.mapper';
import { UserSchema } from '@/core/user/infra/database/typeorm/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { PlanMapper } from '@/core/plan/infra/database/typeorm/repositories/mapper/plan-mapper';

@Injectable()
export class CompanyRepositoryMapper {
  static toEntity(schema: CompanySchema): Company {
    const entity = new Company({
      id: schema.id,
      fantasyName: schema.fantasyName,
      socialReazon: schema.socialReazon,
      cnpj: schema.cnpj,
      phoneNumber: schema.phoneNumber,
      active: schema.active,
      email: schema.email,
      logotipo: schema.logotipo,
      address: AddressRepositoryMapper.toEntity(schema.address),
      plan: PlanMapper.toEntity(schema.plan),
      auditable: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
      createdBy: schema.createdBy.id,
      updatedBy: schema.updatedBy.id,
      deletedBy: schema.deletedBy?.id,
    });

    return entity;
  }

  static toSchema(entity: Company): CompanySchema {
    const schema = CompanySchema.with({
      id: entity.id,
      fantasyName: entity.fantasyName,
      socialReazon: entity.socialReazon,
      cnpj: entity.cnpj,
      phoneNumber: entity.phoneNumber,
      active: entity.active,
      email: entity.email,
      logotipo: entity.logotipo,
      createdAt: entity.auditable?.createdAt,
      updatedAt: entity.auditable?.updatedAt,
      deletedAt: entity.auditable?.deletedAt,
      createdBy: UserSchema.from({ id: entity.createdBy }),
      updatedBy: UserSchema.from({ id: entity.updatedBy }),
      deletedBy: entity.deletedBy
        ? UserSchema.from({ id: entity.deletedBy })
        : null,
      address: AddressRepositoryMapper.toSchema(entity.address),
      plan: PlanMapper.toSchema(entity.plan)
    });

    return schema;
  }
}
