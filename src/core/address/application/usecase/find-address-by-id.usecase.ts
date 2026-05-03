import { PROVIDERS } from '@/shared/application/constants/providers';
import { UpdateAddressOutput } from '@/shared/application/output/address/update-address.output';
import { UseCase } from '@/shared/application/usecase/usecase';
import { AddressRepository } from '../../domain/repositories/address.repository';
import { Inject } from '@nestjs/common';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { AddressEntity } from '../../domain/entities/address.entity';

type Input = {
  id: string;
};

type Output = UpdateAddressOutput;

export class FindAddressByCompanyIdUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.ADDRESS_REPOSITORY)
    private readonly addressRepository: AddressRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const address = await this.addressRepository.findById(input.id);
    if (!address) {
      throw new NotFoundError(`Endereço não encontrado`);
    }

    const output = this.outputAddress(address);

    return output;
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
        },
      },
    };
  }
}
