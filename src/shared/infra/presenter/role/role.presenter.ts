import { ApiProperty } from "@nestjs/swagger";
import { CompanyPresenter } from "../company/company-presenter";

export class RolePresenter {

  @ApiProperty({ description: 'Id do cargo' })
  readonly id: string;
  @ApiProperty({ description: 'Nome do cargo' })
  readonly name: string;
  @ApiProperty({ description: 'empresa pertencente ao cargo' })
  readonly company?: CompanyPresenter;

  constructor(props: RolePresenter) {
    this.id = props.id;
    this.name = props.name;
    this.company = props?.company
  }
}