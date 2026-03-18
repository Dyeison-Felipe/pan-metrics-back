import { PROVIDERS } from '@/shared/application/constants/providers';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject } from '@nestjs/common';
import { CityRepository } from '../../domain/repositories/city.repository';
import { PaginationDto } from '@/shared/infra/dto/pagination.dto';
import { CityOutput } from '@/shared/application/output/city/city.output';
import { Pagination } from '@/shared/domain/pagination/pagination';
import { FindAllSearchCityOutput } from '@/shared/application/output/city/find-all-search-city.output';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

type Input = {
  pagination: PaginationDto;
  state: string;
  search?: string;
};

type Output = Pagination<FindAllSearchCityOutput>;

export class SearchCityPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
  ) {}
  async execute({ pagination, state, search }: Input): Promise<Output> {
    const cities = await this.cityRepository.search(state, pagination, search);

    if (cities.meta.totalItems === 0) {
      throw new NotFoundError(`Nenhuma cidade encontrada`);
    }

    const cityOutput = cities.items.map((city) => ({
      id: city.id,
      name: city.name,
    }));

    return {
      items: cityOutput,
      meta: cities.meta,
    };
  }
}
