import { ApiProperty } from '@nestjs/swagger';
import { StatePresenter } from '../state/state.presenter';

export class FindAllSearchCityPresenter {
  @ApiProperty({ description: 'Id da cidade' })
  readonly id: string;

  @ApiProperty({ description: 'Nome da cidade' })
  readonly name: string;

  constructor(props: FindAllSearchCityPresenter) {
    this.id = props.id;
    this.name = props.name;
  }
}
