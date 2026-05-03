import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { PROVIDERS } from '@/shared/application/constants/providers';
import { JwtService } from '@/shared/application/jwt/jwt.service';
import { UserRepository } from '@/core/user/domain/repositories/user.repository';
import { LoggedUserService } from '@/shared/application/logged-user/logged-user.service';
import { UnauthorizedError } from '@/shared/application/errors/unauthorized-error';
import { CaslAbilityService } from '../service/casl-ability.service';
import { PermissionRef } from '@/core/auth/domain/permissions-definition/persmissions';
import {
  IS_PUBLIC_KEY,
  PERMISSIONS_KEY,
} from '@/shared/infra/decorators/permission.decorator';

@Injectable({ scope: Scope.REQUEST })
export class PermissionGuard implements CanActivate {
  constructor(
    @Inject(PROVIDERS.JWT_SERVICE) private readonly jwtService: JwtService,
    @Inject(PROVIDERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROVIDERS.LOGGED_USER_SERVICE)
    private readonly loggedUserService: LoggedUserService,
    @Inject(PROVIDERS.CASL_ABILITY_SERVICE)
    private readonly caslAbilityService: CaslAbilityService,
    @Inject(Reflector)
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Rota pública, libera sem verificar nada
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    // 2. Valida o token
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = request.cookies?.developmentAuthToken;

    if (!token) throw new UnauthorizedError();

    try {
      const payload = await this.jwtService.verifyJwt(token);

      if (!payload) return false;

      // 3. Busca usuário com permissions
      const user = await this.userRepository.findByIdWithPermissions(
        payload.sub,
      );

      if (!user) throw new UnauthorizedError();

      if(!user.active) throw new UnauthorizedError();


      request.user = user;
      this.loggedUserService.setLoggedUser(user);

      // 4. Verifica permissões com CASL
      const policies = this.reflector.getAllAndOverride<PermissionRef[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!policies || policies.length === 0) return true;

      const ability = this.caslAbilityService.createForUser(user);

      return policies.every(({ action, resource }) =>
        ability.can(action, resource),
      );
    } catch (error) {
      throw new UnauthorizedError(`Not authorized: ${error}`);
    }
  }
}
