import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

type StateProps = {
  id: string;
  name: string;
  uf: string;
};

export class StateEntity {
  id: string;
  name: string;
  uf: string;

  constructor(props: StateProps) {
    this.id = crypto.randomUUID();
    this.name = props.name;
    this.uf = props.uf;
  }
}
