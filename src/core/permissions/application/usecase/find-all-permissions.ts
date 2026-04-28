import { PROVIDERS } from '@/shared/application/constants/providers';
import { FindAllPermissionsOutput } from '@/shared/application/output/permissions/find-all-permissions.output';
import { UseCase } from '@/shared/application/usecase/usecase';
import { PermissionRepository } from '../../domain/repositories/permission.repository';
import { Inject } from '@nestjs/common';

type Input = void;

type Output = FindAllPermissionsOutput[];

export class FindAllPermissionsUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.PERMISSION_REPOSITORY)
    private readonly resourceRepository: PermissionRepository,
  ) {}

  async execute(input: void): Promise<Output> {
    const permissions = await this.resourceRepository.findAll();

    if (!permissions) return [];

    const output: Output = permissions?.map((permission) => {
      return {
        id: permission.id,
        action: permission.action,
        subject: permission.subject,
      };
    });

    return output;
  }
}
