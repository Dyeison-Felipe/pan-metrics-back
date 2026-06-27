import { ApiProperty } from "@nestjs/swagger";
import { PlanPresenter } from "../plan/plan.presenter";

export class PlanPermissionDescriptionPresenter {
  @ApiProperty({ description: 'descrição da permissão' })
  readonly description: string;

  constructor(description: string) {
    this.description = description;
  }
}

export class PlanPermissionPresenter {

  @ApiProperty({ description: 'plano' })
  readonly plan: PlanPresenter;
  @ApiProperty({ description: 'permissões do plano' })
  readonly permissions: PlanPermissionDescriptionPresenter[];

  constructor(props: PlanPermissionPresenter) {
    this.plan = props.plan;
    this.permissions = props.permissions;
  }
}