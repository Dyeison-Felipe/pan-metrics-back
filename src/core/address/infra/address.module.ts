import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from './database/typeorm/schema/address.schema';
import { PROVIDERS } from '@shared/application/constants/providers';
import { AddressRepositoryImpl } from './database/typeorm/repository/address.repository';
import { AddressRepositoryMapper } from './database/typeorm/repository/mapper/address-repository.mapper';
import { CityModule } from '@core/cities/infra/city.module';
import { AddressController } from './controllers/address.controller';
import { CreateAddressUseCase } from '../application/usecase/create-address.usecase';
import { AddressRepository } from '../domain/repositories/address.repository';
import { CityRepository } from '@core/cities/domain/repositories/city.repository';
import { UpdateAddressUseCase } from '../application/usecase/update-address.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([AddressSchema]), CityModule],
  controllers: [AddressController],
  providers: [
    {
      provide: PROVIDERS.ADDRESS_MAPPER,
      useClass: AddressRepositoryMapper,
    },
    {
      provide: PROVIDERS.ADDRESS_REPOSITORY,
      useClass: AddressRepositoryImpl,
    },
    {
      provide: CreateAddressUseCase,
      useFactory: (
        addressRepository: AddressRepository,
        cityRepository: CityRepository,
      ) => {
        return new CreateAddressUseCase(addressRepository, cityRepository);
      },
      inject: [PROVIDERS.ADDRESS_REPOSITORY, PROVIDERS.CITY_REPOSITORY],
    },
    {
      provide: UpdateAddressUseCase,
      useFactory: (
        addressRepository: AddressRepository,
        cityRepository: CityRepository,
      ) => {
        return new UpdateAddressUseCase(addressRepository, cityRepository);
      },
      inject: [PROVIDERS.ADDRESS_REPOSITORY, PROVIDERS.CITY_REPOSITORY],
    },
  ],
  exports: [PROVIDERS.ADDRESS_MAPPER, PROVIDERS.ADDRESS_REPOSITORY],
})
export class AddressModule {}
