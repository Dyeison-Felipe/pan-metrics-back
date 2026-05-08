import { StateEntity } from '@/core/states/domain/entities/state.entity';
import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/base-entity';

type CityProps = {
  id: string;
  name: string;
  state: StateEntity;
};

export class CityEntity {
  id: string;
  name: string;
  state: StateEntity;

  constructor(props: CityProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.name = props.name;
    this.state = props.state;
  }
}
