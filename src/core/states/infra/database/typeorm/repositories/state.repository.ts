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
    @Inject(PROVIDERS.STATE_MAPPER)
    private readonly stateMapper: StateMapper,
  ) {}

  async findById(id: string): Promise<StateEntity | null> {
    const stateSchema = await this.stateRepository.findOne({
      where: {id},
    })

    if(!stateSchema) return null;

    const stateEntity = this.stateMapper.toEntity(stateSchema);

    return stateEntity;
  }
  async findAll(): Promise<StateEntity[]> {
    const statesSchema = await this.stateRepository.find();

    const statesEntity = statesSchema.map(state => this.stateMapper.toEntity(state));

    return statesEntity;
  }
}
