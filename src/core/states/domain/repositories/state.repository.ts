import { StateEntity } from "../entities/state.entity";

export interface StateRepository {
  findById(id: string): Promise<StateEntity | null>;
  findAll(): Promise<StateEntity[]>;
}