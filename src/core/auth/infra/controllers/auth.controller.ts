import { Body, Controller, Post, Query, Req, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { LoginDto } from '../dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/usecase/login.usecase';
import { LoginPresenter } from '@/shared/infra/presenter/login/login.presenter';

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
