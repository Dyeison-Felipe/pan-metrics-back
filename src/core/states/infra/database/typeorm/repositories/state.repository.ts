import { InjectRepository } from '@nestjs/typeorm';
import { StateSchema } from '../schema/state.schema';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { StateMapper } from './mapper/state-mapper';
import { StateRepository } from '@/core/states/domain/repositories/state.repository';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { StateEntity } from '@/core/states/domain/entities/state.entity';

export class StateRepositoryImpl implements StateRepository {
  constructor(
    @InjectRepository(StateSchema)
    private readonly stateRepository: Repository<StateSchema>,
  ) {}

  async findById(id: string): Promise<StateEntity | null> {
    const stateSchema = await this.stateRepository.findOne({
      where: { id },
    });

    if (!stateSchema) return null;

    const stateEntity = StateMapper.toEntity(stateSchema);

    return stateEntity;
  }
  async search(search: string): Promise<StateEntity[]> {
    const queryBuilder = this.stateRepository.createQueryBuilder('state');

    if (search) {
      queryBuilder
        .where('state.name ILIKE :search OR state.uf ILIKE :search', {
          search: `%${search}%`,
        })
        .orderBy(
          `CASE WHEN state.name ILIKE :startsWith OR state.uf ILIKE :startsWith THEN 0 ELSE 1 END`,
          'ASC',
        )
        .addOrderBy('state.name', 'ASC')
        .setParameter('startsWith', `${search}%`);
    }

    const statesSchema = await queryBuilder.getMany();

    const statesEntity = statesSchema.map((state) =>
      StateMapper.toEntity(state),
    );

    return statesEntity;
  }
}
