import { PROVIDERS } from "@/shared/application/constants/providers"
import { UseCase } from "@/shared/application/usecase/usecase"
import { Inject } from "@nestjs/common"
import { CityRepository } from "../../domain/repositories/city.repository"
import { PaginationDto } from "@/shared/infra/dto/pagination.dto"
import { CityOutput } from "@/shared/application/output/city/city.output"
import { Pagination } from "@/shared/domain/pagination/pagination"

type Input = {
  pagination: PaginationDto;
  search: string;
}

type Output = Pagination<CityOutput>

export class SearchCityPaginatedUseCase implements UseCase<Input, Output> {
  constructor(@Inject(PROVIDERS.CITY_REPOSITORY) private readonly cityRepository: CityRepository) {}
  async execute({pagination, search}: Input): Output | Promise<Output> {
  
  }

}