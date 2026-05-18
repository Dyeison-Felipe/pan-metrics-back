import { BaseRepository } from "@/shared/domain/repository/base-repository";
import { Address } from "../entities/address.entity";

export interface AddressRepository extends BaseRepository<Address> {
    
}