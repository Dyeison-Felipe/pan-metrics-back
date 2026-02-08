import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PROVIDERS } from "@shared/application/constants/providers";
import { StateEntity } from "@shared/domain/entity/state.entity";
import { Repository } from "typeorm";
import { StateMapper } from "../mappers/state-mapper";
import { StateSchema } from "../../schema/state.schema";

export class StateQueries {
  constructor(@InjectRepository(StateSchema) private readonly stateRepository: Repository<StateSchema>,
  @Inject(PROVIDERS.STATE_MAPPER) private readonly stateMapper: StateMapper
) {}

  async findById(id: string): Promise<StateEntity | null> {
    const stateSchema = await this.stateRepository.findOne({
      where: {id}
    })

    if(!stateSchema) return null;

    const stateEntity = this.stateMapper.toEntity(stateSchema);

    return stateEntity
  }
}