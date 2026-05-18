import { BaseRepository } from "@/shared/domain/repository/base-repository";
import { Company } from "../entities/company.entity";

export interface CompanyRepository extends BaseRepository<Company> {
  findByCnpj(cnpj: string): Promise<Company | null>
}