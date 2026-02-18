import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { UnauthorizedError } from '@shared/application/errors/unauthorized-error';
import { PROVIDERS } from '@shared/application/constants/providers';
import type { JwtService, Payload } from '@shared/application/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PROVIDERS.JWT_SERVICE) private readonly jwtService: JwtService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Token not fond');
    }

    try {
      const payload = await this.jwtService.verifyJwt(token);
      console.log("🚀 ~ AuthGuard ~ canActivate ~ payload:", payload)
      // pegar o usuário e colcoar na request
      return true;
    } catch (error) {
      console.error(error)
      throw new UnauthorizedError(`Not authorized ${error}`);
    }

    return true;
  }
}
