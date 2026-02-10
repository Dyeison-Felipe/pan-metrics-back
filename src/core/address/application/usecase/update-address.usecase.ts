import { AddressEntity } from '@core/address/domain/entities/address.entity';
import type { AddressRepository } from '@core/address/domain/repositories/address.repository';
import { CityEntity } from '@core/cities/domain/entities/city.entity';
import type { CityRepository } from '@core/cities/domain/repositories/city.repository';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@shared/application/constants/providers';
import { NotFoundError } from '@shared/application/errors/not-found-error';
import { UpdateAddressInput } from '@shared/application/input/address/update-address.input';
import { UpdateAddressOutput } from '@shared/application/output/address/update-address.output';
import { UseCase } from '@shared/application/usecase/usecase';
import { Transactional } from '@shared/infra/database/typeorm/decorators/transactional.decorator';

type Input = UpdateAddressInput;
type Output = UpdateAddressOutput;


export class UpdateAddressUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.ADDRESS_REPOSITORY)
    private readonly addressRepository: AddressRepository,
    @Inject(PROVIDERS.CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    const address = await this.addressRepository.findById(input.id);
    if (!address) {
      throw new NotFoundError(`Endereço não encontrado`);
    }

    const city = await this.cityRepository.findById(input.cityId);

    if (!city) {
      throw new NotFoundError(`Cidade não encontrada`);
    }

    this.updateAddress(address, input, city);

    const updateAddress = await this.addressRepository.save(address);

    const output = this.outputAddress(updateAddress);

    return output;

  }

  updateAddress(
    address: AddressEntity,
    updateProps: Input,
    city: CityEntity,
  ): AddressEntity {
    address.cep = updateProps.cep;
    address.neighborhood = updateProps.neighborhood;
    address.street = updateProps.street;
    address.number = updateProps.number;
    address.complement = updateProps.complement;
    address.latitude = updateProps.latitude;
    address.longitude = updateProps.longitude;
    address.city = city;
    return address;
  }

  outputAddress(address: AddressEntity): Output {
    return {
      id: address.id,
      cep: address.cep,
      neighborhood: address.neighborhood,
      street: address.street,
      number: address.number,
      complement: address.complement,
      latitude: address.latitude,
      longitude: address.longitude,
      city: { 
        id: address.city.id,
        name: address.city.name,
        state: {
          id: address.city.state.id,
          name: address.city.state.name,
          uf: address.city.state.uf,
        }
      }
    }
  }
}
