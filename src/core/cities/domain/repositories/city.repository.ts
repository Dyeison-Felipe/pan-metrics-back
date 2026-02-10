import { CityEntity } from "../entities/city.entity";

export interface CityRepository {
  findById(id: string): Promise<CityEntity | null>;
}