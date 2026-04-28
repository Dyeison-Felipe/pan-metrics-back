// src/shared/application/casl/casl-ability.factory.ts
import { Injectable } from '@nestjs/common';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { UserEntity } from '@/core/user/domain/entities/user.entity';
import { Action, Subject } from '@/shared/infra/enums/casl.enum';

export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserEntity): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    for (const userPermission of user.userPermissions ?? []) {
      can(
        userPermission.permission.action as Action,
        userPermission.permission.subject as Subject,
      );
    }

    return build();
  }
}
