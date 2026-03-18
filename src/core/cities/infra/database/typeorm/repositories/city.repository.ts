import { InjectRepository } from '@nestjs/typeorm';
import { CitySchema } from '../schema/city.schema';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CityMapper } from './mapper/city-mapper';
import { CityRepository } from '@/core/cities/domain/repositories/city.repository';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { CityEntity } from '@/core/cities/domain/entities/city.entity';
import { Pagination } from '@/shared/domain/pagination/pagination';
import { PaginationDto } from '@/shared/infra/dto/pagination.dto';
import { paginateQuery } from '@/shared/infra/database/typeorm/paginate-query/paginate-query';

export class CityRepositoryImpl implements CityRepository {
  constructor(
    @InjectRepository(CitySchema)
    private readonly cityRepository: Repository<CitySchema>,
    @Inject(PROVIDERS.CITY_MAPPER) private readonly cityMapper: CityMapper,
  ) {}

  async search(
    state: string,
    pagination: PaginationDto,
    search?: string,
  ): Promise<Pagination<CityEntity>> {
    const queryBuilder = this.cityRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.state', 'state')
      .where('state.uf = :state', { state: state });

    if (search) {
      queryBuilder
        .andWhere('city.name ILIKE :name', { name: `%${search}%` })
        .addSelect(
          `CASE WHEN city.name ILIKE :startsWith THEN 0 ELSE 1 END`,
          'priority',
        )
        .setParameter('startsWith', `${search}%`)
        .orderBy('priority', 'ASC')
        .addOrderBy('city.name', 'ASC');
    }

    const result = await paginateQuery(queryBuilder, pagination);

    // Mapeia schemas para entities de domínio
    const cities = result.items.map((city) => this.cityMapper.toEntity(city));

    return {
      items: cities,
      meta: result.meta,
    };
  }

  async findById(id: string): Promise<CityEntity | null> {
    const citySchema = await this.cityRepository.findOne({
      where: { id },
      relations: ['state'],
    });

    if (!citySchema) return null;

    const cityEntity = this.cityMapper.toEntity(citySchema);

    return cityEntity;
  }
}
