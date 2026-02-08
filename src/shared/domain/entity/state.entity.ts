import { BaseEntity } from './baseEntity';

type StateProps = {
  name: string;
  uf: string;
};

export interface StateEntity extends BaseEntity<StateProps> {}

export class StateEntity extends BaseEntity<StateProps> {}
