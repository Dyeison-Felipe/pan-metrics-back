import { InjectRepository } from '@nestjs/typeorm';
import { CitySchema } from '../../schema/city.schema';
import { Repository } from 'typeorm';
import { CityEntity } from '@shared/domain/entity/city.entity';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@shared/application/constants/providers';
import { CityMapper } from '../mappers/city-mapper';

export class CityQuery {
  constructor(
    @InjectRepository(CitySchema)
    private readonly cityRepository: Repository<CitySchema>,
    @Inject(PROVIDERS.CITY_MAPPER) private readonly cityMapper: CityMapper,
  ) {}

  async findById(id: string): Promise<CityEntity | null> {
    const citySchema = await this.cityRepository.findOne({
      where: { id },
    });

    if (!citySchema) return null;

    const cityEntity = this.cityMapper.toEntity(citySchema);

    return cityEntity;
  }
}
