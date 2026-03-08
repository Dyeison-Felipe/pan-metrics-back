import { BaseRepository } from '@/shared/domain/repository/base-repository';
import { UserEntity } from '../entities/user.entity';

export interface UserRepository extends BaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}
