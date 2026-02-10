import { StateEntity } from '@core/states/domain/entities/state.entity';
import { BaseEntity } from '../../../../shared/domain/entity/baseEntity';

type CityProps = {
  name: string;
  state: StateEntity;
};

export interface CityEntity extends CityProps {}

export class CityEntity extends BaseEntity<CityProps> {}
