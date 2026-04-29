import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { LoginDto } from '../dtos/login.dto';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/usecase/login.usecase';
import { LoginPresenter } from '@/shared/infra/presenter/login/login.presenter';
import { Public } from '@/shared/infra/decorators/permission.decorator';

@ApiTags('Auth')
@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ description: 'Login realizado com sucesso', type: LoginPresenter })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor',
  })
  async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() loginRequestDto: LoginDto,
  ): Promise<LoginPresenter> {
    return await this.loginUseCase.execute({
      ...loginRequestDto,
      setCookie: reply.setCookie.bind(reply),
    });
  }
}
