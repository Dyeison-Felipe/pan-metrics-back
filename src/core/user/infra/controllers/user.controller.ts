import { CreateUserUseCase } from '@core/user/application/usecase/create-user.usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserPresenter } from '@shared/infra/presenter/user/user.presenter';
import { ConvertPresenter } from '@shared/infra/presenter/converter/converter.presenter';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/user/v1')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso', type: UserPresenter })
  @ApiConflictResponse({description: 'Usuário á existente'})
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor',
  })
  async create(@Body() body: CreateUserDto): Promise<UserPresenter> {
    const output = await this.createUserUseCase.execute(body);

    const presenter = ConvertPresenter.toPresenter(output, UserPresenter);

    return presenter;
  }
}
