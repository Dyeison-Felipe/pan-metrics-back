import { LoginUseCase } from '@core/auth/application/usecase/login.usecase';
import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { LoginDto } from '../dtos/login.dto';
import { LoginPresenter } from '@shared/infra/presenter/login/login.presenter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth/v1')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Body() loginRequestDto: LoginDto,
    @Query('page') page?: string,
  ): Promise<LoginPresenter> {
    return await this.loginUseCase.execute({
      ...loginRequestDto,
      setCookie: reply.setCookie.bind(reply),
    });
  }
}
