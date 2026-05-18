import { RoleRepository } from '@/core/role/domain/repositories/role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleSchema } from '../schema/role.schema';
import { Repository } from 'typeorm';
import { Role } from '@/core/role/domain/entities/role.entity';
import { RoleRepositoryMapper } from './role.mapper';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly roleRepository: Repository<RoleSchema>,
  ) {}

  async save(entity: Role): Promise<Role> {
    const schema = RoleRepositoryMapper.toSchema(entity);

    const saved = await this.roleRepository.save(schema);

    const roleEntity = RoleRepositoryMapper.toEntity(saved);

    return roleEntity;
  }

  async findById(id: string): Promise<Role | null> {
    const roleSchema = await this.roleRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!roleSchema) return null;

    const roleEntity = RoleRepositoryMapper.toEntity(roleSchema);

    return roleEntity;
  }

  async update(entity: Role): Promise<Role> {
    const schema = RoleRepositoryMapper.toSchema(entity);

    const saved = await this.roleRepository.save(schema);

    const roleEntity = RoleRepositoryMapper.toEntity(saved);

    return roleEntity;
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.softDelete(id);
  }
}
