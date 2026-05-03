import { Injectable, Scope } from '@nestjs/common';
import {
  AbilityService,
  AppAbility,
} from '../../application/service/casl-ability.service';
import { UserLogin } from '@/core/user/domain/repositories/user.repository';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import {
  PermissionActions,
  PermissionResources,
} from '../../domain/permissions-definition/persmissions';

@Injectable({ scope: Scope.REQUEST })
export class CaslAbilityService implements AbilityService {
  ability: AppAbility;

  createForUser(user: UserEntity) {
    const builder = new AbilityBuilder<AppAbility>(PureAbility);

    user.userPermissions?.forEach(({ permission }) => {
      builder.can(
        permission.action as PermissionActions,
        permission.subject as PermissionResources,
      );
    });

    this.ability = builder.build();
    return this.ability;
  }
}
