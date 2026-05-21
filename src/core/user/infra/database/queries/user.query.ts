import { Repository } from 'typeorm';
import { UserSchema } from '../typeorm/schema/user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UserByLogin,
  UserQuery,
} from '@/core/user/application/queries/user.query';

export class UserQueryImpl implements UserQuery {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async findUserByEmail(email: string): Promise<UserByLogin | null> {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.role', 'role')
      .leftJoin('user.userPermissions', 'userPermissions')
      .leftJoin('userPermissions.permission', 'permission')
      .select([
        'user.id',
        'user.email',
        'user.password',
        'user.username',
        'user.active',
        'role.name',
        'permission.id',
        'permission.action',
        'permission.subject',
      ])
      .where('user.email = :email', { email })
      .getOne();

    if (!queryBuilder) return null;

    const user: UserByLogin = {
      id: queryBuilder.id,
      username: queryBuilder.username,
      email: queryBuilder.email,
      password: queryBuilder.password,
      active: queryBuilder.active,
      role: queryBuilder.role.name,
      permissions:
        queryBuilder.userPermissions?.map((up) => ({
          id: up.permission.id,
          action: up.permission.action,
          subject: up.permission.subject,
        })) ?? [],
    };

    return user;
  }
}
