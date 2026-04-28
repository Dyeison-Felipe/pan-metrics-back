// import { UserEntity } from '@/core/user/domain/entities/user.entity';
// import { Roles } from '@/shared/infra/enums/roles.enum';
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// import { FastifyRequest } from 'fastify';

// type AuthenticatedRequest = FastifyRequest & { user: UserEntity };

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.get<Roles[]>(
//       'roles',
//       context.getHandler(),
//     );

//     if (!requiredRoles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

//     const authUser = (request.user) as UserEntity;

//     return authUser.role === Roles.ADMIN || requiredRoles.includes(authUser.role)
//   }
// }
