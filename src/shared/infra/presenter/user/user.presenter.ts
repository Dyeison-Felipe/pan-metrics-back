import { ApiProperty } from "@nestjs/swagger";

export class UserPresenter {
  @ApiProperty({ description: 'Id de identidicação do usuário' })
  readonly id: string;

  @ApiProperty({description: 'Username do usuário'})
  readonly username: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  readonly email: string;

  constructor(props: UserPresenter) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
  }
}