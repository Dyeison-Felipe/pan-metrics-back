import { Pagination } from "@/shared/domain/pagination/pagination";
import { CityEntity } from "../entities/city.entity";
import { PaginationDto } from "@/shared/infra/dto/pagination.dto";

export interface CityRepository {
  findById(id: string): Promise<CityEntity | null>;
  search(state: string, pagination: PaginationDto, search?: string): Promise<Pagination<CityEntity>>;
}