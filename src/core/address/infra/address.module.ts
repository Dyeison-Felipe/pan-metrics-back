import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from './database/typeorm/schema/address.schema';
import { PROVIDERS } from '@shared/application/constants/providers';
import { AddressRepositoryImpl } from './database/typeorm/repository/address.repository';
import { AddressRepositoryMapper } from './database/typeorm/repository/mapper/address-repository.mapper';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([AddressSchema]), SharedModule],
  controllers: [],
  providers: [
    {
      provide: PROVIDERS.ADDRESS_REPOSITORY,
      useClass: AddressRepositoryImpl,
    },
    {
      provide: PROVIDERS.ADDRESS_MAPPER,
      useClass: AddressRepositoryMapper,
    },
  ],
  exports: [PROVIDERS.ADDRESS_MAPPER, PROVIDERS.ADDRESS_REPOSITORY],
})
export class AddressModule {}
