import { ApiProperty } from '@nestjs/swagger';
import { UserLoginPresenter } from '../user/user-login.presenter';

export class LoginPresenter {

  readonly user: UserLoginPresenter

  @ApiProperty({
    description: 'Token da autenticação',
  })
  readonly token: string;
}
