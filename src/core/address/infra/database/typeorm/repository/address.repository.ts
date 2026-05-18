import { Repository } from 'typeorm';
import { AddressSchema } from '../schema/address.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepositoryMapper } from './mapper/address-repository.mapper';
import { AddressRepository } from '@/core/address/domain/repositories/address.repository';
import { Address } from '@/core/address/domain/entities/address.entity';

export class AddressRepositoryImpl implements AddressRepository {
  constructor(
    @InjectRepository(AddressSchema)
    private readonly addressRepository: Repository<AddressSchema>,
  ) {}

  async save(entity: Address): Promise<Address> {
    const addressSchema = AddressRepositoryMapper.toSchema(entity);

    const savedAddress = await this.addressRepository.save(addressSchema);

    const addressEntity = AddressRepositoryMapper.toEntity(savedAddress);

    return addressEntity;
  }

  async findById(id: string): Promise<Address | null> {
    const addressSchema = await this.addressRepository.findOne({
      where: { id },
      relations: ['city', 'city.state']
    });

    if (!addressSchema) return null;

    const addressEntity = AddressRepositoryMapper.toEntity(addressSchema);

    return addressEntity;
  }

  async update(entity: Address): Promise<Address> {

    const addressSchema = AddressRepositoryMapper.toSchema(entity);

    const updateAddres = await this.addressRepository.save(addressSchema);

    const addressEntity = AddressRepositoryMapper.toEntity(updateAddres);

    return addressEntity;
  }

  async delete(id: string): Promise<void> {
    await this.addressRepository.softDelete(id);
  }
}
