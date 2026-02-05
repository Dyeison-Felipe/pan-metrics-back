import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../../../domain/entities/role.entity';
import { RoleRepository } from '../../../../domain/repositories/role.repository';
import { RoleSchema } from '../schema/role.schema';
import { Repository } from 'typeorm';
import { RoleMapper } from './mapper/role-mapper';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly roleRepository: Repository<RoleSchema>,
    private readonly roleMapper: RoleMapper,
  ) {}

  async createRole(role: Role): Promise<void> {
    const roleSchema = this.roleMapper.toSchema(role);

    await this.roleRepository.save(roleSchema);
  }

  async updateRole(role: Role): Promise<void> {
    const roleSchema = this.roleMapper.toSchema(role);

    await this.roleRepository.save(roleSchema);
  }

  async deletedRole(role: Role): Promise<void> {
    const roleSchema = this.roleMapper.toSchema(role);

    await this.roleRepository.softDelete(roleSchema.id);
  }

  async getById(id: string): Promise<Role | null> {
    const roleSchema = await this.roleRepository.findOne({
      where: { id },
    });

    if (!roleSchema) return null;

    const role = this.roleMapper.toEntity(roleSchema);

    return role;
  }
}
