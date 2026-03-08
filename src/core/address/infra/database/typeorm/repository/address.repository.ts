import { Repository } from 'typeorm';
import { AddressSchema } from '../schema/address.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepositoryMapper } from './mapper/address-repository.mapper';
import { Inject } from '@nestjs/common';
import { AddressRepository } from '@/core/address/domain/repositories/address.repository';
import { AddressEntity } from '@/core/address/domain/entities/address.entity';
import { PROVIDERS } from '@/shared/application/constants/providers';

export class AddressRepositoryImpl implements AddressRepository {
  constructor(
    @InjectRepository(AddressSchema)
    private readonly addressRepository: Repository<AddressSchema>,
    @Inject(PROVIDERS.ADDRESS_MAPPER)
    private readonly addressRepositoryMapper: AddressRepositoryMapper,
  ) {}

  async save(entity: AddressEntity): Promise<AddressEntity> {
    const addressSchema = this.addressRepositoryMapper.toSchema(entity);

    const savedAddress = await this.addressRepository.save(addressSchema);

    const addressEntity = this.addressRepositoryMapper.toEntity(savedAddress);

    return addressEntity;
  }

  async findById(id: string): Promise<AddressEntity | null> {
    const addressSchema = await this.addressRepository.findOne({
      where: { id },
    });

    if (!addressSchema) return null;

    const addressEntity = this.addressRepositoryMapper.toEntity(addressSchema);

    return addressEntity;
  }

  async update(entity: AddressEntity): Promise<AddressEntity> {
    const addressSchema = await this.addressRepository.save(entity);

    const addressEntity = this.addressRepositoryMapper.toEntity(addressSchema);

    return addressEntity;
  }

  async delete(id: string): Promise<void> {
    await this.addressRepository.softDelete(id);
  }
}
