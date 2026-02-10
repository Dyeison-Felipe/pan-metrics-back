import { ApiProperty } from "@nestjs/swagger";

export class StatePresenter {
  @ApiProperty({description: 'Id do estado'})
  readonly id: string;

  @ApiProperty({description: 'Nome do estado'})
  readonly name: string;

  @ApiProperty({description: 'Sigla do estado'})
  readonly uf: string;

  constructor(props: StatePresenter) {
    this.id = props.id;
    this.name = props.name;
    this.uf = props.uf;
  }
}