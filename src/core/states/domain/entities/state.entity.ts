import { Data } from "@/shared/domain/decorators/data.decorator";
import { BaseEntity } from "@/shared/domain/entity/baseEntity";

type StateProps = {
  name: string;
  uf: string;
};

export interface StateEntity extends StateProps {}

@Data()
export class StateEntity extends BaseEntity<StateProps> {}
