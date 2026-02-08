import { StateEntity } from '@core/states/domain/entities/state.entity';
import { BaseEntity } from '../../../../shared/domain/entity/baseEntity';

type CityProps = {
  city: string;
  state: StateEntity;
};

export interface CityEntity extends BaseEntity<CityProps> {}

export class CityEntity extends BaseEntity<CityProps> {}
