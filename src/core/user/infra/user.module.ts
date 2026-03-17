import { Global, Module } from '@nestjs/common';
import { UserRepositoryMapper } from './database/typeorm/repositories/mapper/user-mapper';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { UserRepositoryImpl } from './database/typeorm/repositories/user.repository';
import { HashModule } from '@/shared/infra/hash/hash.module';
import { CreateUserUseCase } from '../application/usecase/create-user.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { HashService } from '@/shared/application/hash/hash.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './database/typeorm/schema/user.schema';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), HashModule],
  controllers: [UserController],
  providers: [
    {
      provide: PROVIDERS.USER_MAPPER,
      useClass: UserRepositoryMapper,
    },
    {
      provide: PROVIDERS.USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashService: HashService,
      ) => {
        return new CreateUserUseCase(userRepository, hashService);
      },
      inject: [PROVIDERS.USER_REPOSITORY, PROVIDERS.HASH_SERVICE],
    },
  ],
  exports: [PROVIDERS.USER_MAPPER, PROVIDERS.USER_REPOSITORY],
})
export class UserModule {}
