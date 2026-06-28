import { PROVIDERS } from '@/shared/application/constants/providers';
import { UseCase } from '@/shared/application/usecase/usecase';
import { Inject, Logger } from '@nestjs/common';
import { CityRepository } from '../../domain/repositories/city.repository';
import { PaginationDto } from '@/shared/infra/dto/pagination.dto';
import { CityOutput } from '@/shared/application/output/city/city.output';
import { Pagination } from '@/shared/domain/pagination/pagination';
import { FindAllSearchCityOutput } from '@/shared/application/output/city/find-all-search-city.output';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

type Input = {
  state: string;
};

type Output = FindAllSearchCityOutput[];

export class SearchCityPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject(PROVIDERS.CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
  ) {}

  private logger = new Logger(SearchCityPaginatedUseCase.name)

  async execute({ state }: Input): Promise<Output> {

    const cities = await this.cityRepository.search(state);

    if (!cities.length) {
      throw new NotFoundError(`Nenhuma cidade encontrada`);
    }

    const cityOutput = cities.map((city) => ({
      id: city.id,
      name: city.name,
    }));

    return cityOutput;
  }
}
