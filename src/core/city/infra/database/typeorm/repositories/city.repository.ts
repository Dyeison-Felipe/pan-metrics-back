import { InjectRepository } from '@nestjs/typeorm';
import { CitySchema } from '../schema/city.schema';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CityMapper } from './mapper/city-mapper';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { Pagination } from '@/shared/domain/pagination/pagination';
import { PaginationDto } from '@/shared/infra/dto/pagination.dto';
import { paginateQuery } from '@/shared/infra/database/typeorm/paginate-query/paginate-query';
import { CityEntity } from '@/core/city/domain/entities/city.entity';
import { CityRepository } from '@/core/city/domain/repositories/city.repository';

export class CityRepositoryImpl implements CityRepository {
  constructor(
    @InjectRepository(CitySchema)
    private readonly cityRepository: Repository<CitySchema>,
  ) {}

  async search(state: string): Promise<CityEntity[]> {
    const cities = await this.cityRepository.find({
      where: { state: { id: state } },
      relations: ['state'],
      order: { name: 'ASC' },
    });

    const citiesEntity = cities.map((city) => CityMapper.toEntity(city));

    return citiesEntity;
  }

  async findById(id: string): Promise<CityEntity | null> {
    const citySchema = await this.cityRepository.findOne({
      where: { id },
      relations: ['state'],
    });

    if (!citySchema) return null;

    const cityEntity = CityMapper.toEntity(citySchema);

    return cityEntity;
  }
}
