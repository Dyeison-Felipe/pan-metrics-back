import { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../schema/user.schema';
import { Repository } from 'typeorm';
import { UserRepositoryMapper } from './mapper/user-mapper';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@/shared/application/constants/providers';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async findByIdWithPermissions(id: string): Promise<UserEntity | null> {
    const userSchema = await this.userRepository.findOne({
      where: { id },
      relations: ['userPermissions', 'userPermissions.permission'],
    });

    if (!userSchema) return null;

    const entity = UserRepositoryMapper.toEntity(userSchema);

    return entity;
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const userSchema = UserRepositoryMapper.toSchema(entity);

    const saveUser = await this.userRepository.save(userSchema);

    const userEntity = UserRepositoryMapper.toEntity(saveUser);

    return userEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userSchema = await this.userRepository.findOne({
      where: { email },
    });

    if (!userSchema) return null;

    const userEntity = UserRepositoryMapper.toEntity(userSchema);

    return userEntity;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userSchema = await this.userRepository.findOne({
      where: { id },
      relations: ['userPermissions', 'userPermissions.permission']
    });

    if (!userSchema) return null;

    const userEntity = UserRepositoryMapper.toEntity(userSchema);

    return userEntity;
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const userSchema = UserRepositoryMapper.toSchema(entity);

    const saveUser = await this.userRepository.save(userSchema);

    const userEntity = UserRepositoryMapper.toEntity(saveUser);

    return userEntity;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
