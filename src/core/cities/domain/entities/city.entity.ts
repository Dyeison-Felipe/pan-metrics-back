import { StateEntity } from '@core/states/domain/entities/state.entity';
import { BaseEntity } from '../../../../shared/domain/entity/baseEntity';
import { Data } from '@shared/domain/decorators/data.decorator';

type CityProps = {
  name: string;
  state: StateEntity;
};

export interface CityEntity extends CityProps {}

@Data()
export class CityEntity extends BaseEntity<CityProps> {}
