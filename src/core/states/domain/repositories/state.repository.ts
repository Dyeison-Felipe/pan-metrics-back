import { StateEntity } from "../entities/state.entity";

export interface StateRepository {
  findById(id: string): Promise<StateEntity | null>;
  search(search: string): Promise<StateEntity[]>;
}