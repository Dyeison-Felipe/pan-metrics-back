import { AddressEntity } from '@core/address/domain/entities/address.entity';
import type { AddressRepository } from '@core/address/domain/repositories/address.repository';
import type { CityRepository } from '@core/cities/domain/repositories/city.repository';
import { Inject } from '@nestjs/common';
import { ID_USER_DEFAULT } from '@shared/application/constants/id-user-default';
import { PROVIDERS } from '@shared/application/constants/providers';
import { NotFoundError } from '@shared/application/errors/not-found-error';
import { CreateAddressInput } from '@shared/application/input/address/create-address.input';
import { CreateAddressOutput } from '@shared/application/output/address/create-address.output';
import { UseCase } from '@shared/application/usecase/usecase';
import { Transactional } from '@shared/infra/database/typeorm/decorators/transactional.decorator';

type Input = CreateAddressInput;

type Output = CreateAddressOutput;

export class CreateAddressUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.ADDRESS_REPOSITORY)
    private readonly addressRepository: AddressRepository,
    @Inject(PROVIDERS.CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    const city = await this.cityRepository.findById(input.cityId);

    if(!city) {
      throw new NotFoundError(`Cidade não encontrada`);
    }

    const address = AddressEntity.create({
      cep: input.cep,
      neighborhood: input.neighborhood,
      street: input.street,
      number: input.number,
      complement: input.complement,
      latitude: input.latitude,
      longitude: input.longitude,
      city: city,
      auditable: {
        createdBy: ID_USER_DEFAULT,
        updatedBy: ID_USER_DEFAULT,
      }
    })

    const createAddress = await this.addressRepository.save(address);

    const output: Output = {
      id: createAddress.id,
      cep: createAddress.cep,
      neighborhood: createAddress.neighborhood,
      street: createAddress.street,
      number: createAddress.number,
      complement: createAddress?.complement,
      latitude: createAddress?.latitude,
      longitude: createAddress?.longitude,
      city: {
        id: createAddress.city.id,
        name: createAddress.city.name,
        state: {
          id: createAddress.city.state.id,
          name: createAddress.city.state.name,
          uf: createAddress.city.state.uf,
        }
      }
    }
    return output;
  }
}
