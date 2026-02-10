import { BaseEntity } from "@shared/domain/entity/baseEntity";

type StateProps = {
  name: string;
  uf: string;
};

export interface StateEntity extends StateProps {}

export class StateEntity extends BaseEntity<StateProps> {}
