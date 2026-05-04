import { Inject } from '@nestjs/common';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import type { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import type { HashService } from '@/shared/application/hash/hash.service';
import { CreateUserInput } from '@/shared/application/input/users/create-user.input';
import { CreateUserOutput } from '@/shared/application/output/users/create-user.output';
import { UseCase } from '@/shared/application/usecase/usecase';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { UserPermissionRepository } from '@/core/user-permissions/domain/repositories/user-permission.repository';
import { PermissionRepository } from '@/core/permissions/domain/repositories/permission.repository';
import { PermissionEntity } from '@/core/permissions/domain/entity/permission.entity';
import { UserPersmissionEntity } from '@/core/user-permissions/domain/entities/user-permission.entity';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { Transactional } from '@/shared/infra/database/typeorm/decorators/transactional.decorator';

type Input = CreateUserInput;

type Output = CreateUserOutput;

export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.HASH_SERVICE)
    private readonly hashService: HashService,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService,
    @Inject(PROVIDERS.USER_PERMISSION_REPOSITORY)
    private readonly userPermissionRepository: UserPermissionRepository,
    @Inject(PROVIDERS.PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    const loggedUser = this.loggedUserService.getLoggedUser();

    const existUser = await this.userRepository.findByEmail(input.email);

    if (existUser) {
      throw new ConflictError(`E-mail invalido`);
    }

    const permissions = await this.permissionRepository.findPermissionsById(
      input.permissionsId,
    );

    if (!permissions.length)
      throw new NotFoundError(`Permissão não encontrada`);

    const hashedPassword = await this.hashService.hash(input.password);

    const userEntity = UserEntity.create({
      ...input,
      password: hashedPassword,
      createdBy: loggedUser?.id ?? ID_USER_DEFAULT,
      updatedBy: loggedUser?.id ?? ID_USER_DEFAULT,
    });

    const newUser = await this.userRepository.save(userEntity);

    const userPermissions = await this.createUserPermission(
      permissions,
      newUser,
    );

    const output = this.outputUser(newUser, userPermissions);

    return output;
  }

  outputUser(
    userEntity: UserEntity,
    userPermissions: UserPersmissionEntity[],
  ): Output {
    const output: Output = {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      permissions: userPermissions.map((userPermission) => ({
        id: userPermission.permission.id,
        action: userPermission.permission.action,
        subject: userPermission.permission.subject,
      })),
    };

    return output;
  }

  async createUserPermission(
    permissions: PermissionEntity[],
    user: UserEntity,
  ): Promise<UserPersmissionEntity[]> {
    try {
      return await Promise.all(
        permissions.map((permission) => {
          const entity = UserPersmissionEntity.create({ user, permission });
          return this.userPermissionRepository.create(entity);
        }),
      );
    } catch (e) {
      throw new BadRequestError(
        `Ocorreu um erro ao salvar as permissões do usuário`,
      );
    }
  }
}
