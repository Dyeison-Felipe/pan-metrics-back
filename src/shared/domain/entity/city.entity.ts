import { BaseEntity } from './baseEntity';
import { StateEntity } from './state.entity';

type CityProps = {
  city: string;
  state: StateEntity;
};

export interface CityEntity extends BaseEntity<CityProps> {}

export class CityEntity extends BaseEntity<CityProps> {}
