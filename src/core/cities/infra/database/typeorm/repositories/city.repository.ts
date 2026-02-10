import { CityRepository } from '@core/cities/domain/repositories/city.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CitySchema } from '../schema/city.schema';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '@shared/application/constants/providers';
import { CityMapper } from './mapper/city-mapper';
import { CityEntity } from '@core/cities/domain/entities/city.entity';

export class CityRepositoryImpl implements CityRepository {
  constructor(
    @InjectRepository(CitySchema)
    private readonly cityRepository: Repository<CitySchema>,
    @Inject(PROVIDERS.CITY_MAPPER) private readonly cityMapper: CityMapper,
  ) {}

  async findById(id: string): Promise<CityEntity | null> {
    const citySchema = await this.cityRepository.findOne({
      where: { id },
      relations: ['state']
    });

    if (!citySchema) return null;

    const cityEntity = this.cityMapper.toEntity(citySchema);

    return cityEntity;
  }
}
