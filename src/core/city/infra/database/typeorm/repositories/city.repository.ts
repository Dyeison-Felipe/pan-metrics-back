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

  async search(
    state: string,
    pagination: PaginationDto,
    search?: string,
  ): Promise<Pagination<CityEntity>> {
    const queryBuilder = this.cityRepository
      .createQueryBuilder('cities')
      .leftJoinAndSelect('cities.state', 'state')
      .where('state.id = :state', {
        state: state,
      })
      .orderBy('cities.name', 'ASC');

    if (search) {
      queryBuilder
        .andWhere('cities.name ILIKE :name', { name: `%${search}%` })
        .addSelect(
          `CASE WHEN cities.name ILIKE :startsWith THEN 0 ELSE 1 END`,
          'priority',
        )
        .setParameter('startsWith', `${search}%`)
        .orderBy('priority', 'ASC')
        .addOrderBy('cities.name', 'ASC');
    }


    const result = await paginateQuery(queryBuilder, pagination);

    // Mapeia schemas para entities de domínio
    const cities = result.items.map((city) => CityMapper.toEntity(city));

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

    const cityEntity = CityMapper.toEntity(citySchema);

    return cityEntity;
  }
}
