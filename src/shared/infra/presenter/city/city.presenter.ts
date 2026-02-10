import { ApiProperty } from '@nestjs/swagger';
import { StatePresenter } from '../state/state.presenter';

export class CityPresenter {
  @ApiProperty({ description: 'Id da cidade' })
  readonly id: string;

  @ApiProperty({ description: 'Nome da cidade' })
  readonly name: string;

  @ApiProperty({ description: 'Objeto do estado da cidade' })
  readonly state: StatePresenter;

  constructor(props: CityPresenter) {
    this.id = props.id;
    this.name = props.name;
    this.state = props.state;
  }
}
