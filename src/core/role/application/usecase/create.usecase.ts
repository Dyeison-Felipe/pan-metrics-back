import { BadRequestError } from '../../../../shared/application/errors/bad-request-error';
import { UseCase } from '../../../../shared/application/usecase/usecase';
import { Role } from '../../domain/entities/role.entity';
import { RoleRepository } from '../../domain/repositories/role.repository';

type Input = {
  name: string;
};

type Output = void;

export class CreateRoleUseCase implements UseCase<Input, Output> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(input: Input): Promise<Output> {

    if (!input.name) {
      throw new BadRequestError(`O nome é obrigatório`);
    }

    const role = Role.createRole(input);

    await this.roleRepository.createRole(role);
  }
}
