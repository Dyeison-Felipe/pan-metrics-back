import { ID_USER_DEFAULT } from '@shared/application/constants/id-user-default';
import { Data } from '@shared/domain/decorators/data.decorator';
import { AuditableProps } from '@shared/domain/entity/audit-entity-props';
import { BaseEntity } from '@shared/domain/entity/baseEntity';

export type UserProps = {
  username: string;
  password: string;
  email: string;
  active: boolean;
  auditable: AuditableProps;
};

type CreateUserProps = {
  username: string;
  password: string;
  email: string;
  auditable: AuditableProps;
};

export interface UserEntity extends UserProps {}

@Data()
export class UserEntity extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): UserEntity {
    return new UserEntity({
      id: crypto.randomUUID(),
      username: props.username,
      email: props.email,
      password: props.password,
      active: true,
      auditable: {
        createdAt: props.auditable.createdAt ?? new Date(),
        updatedAt: props.auditable.updatedAt ?? new Date(),
        deletedAt: props.auditable.deletedAt ?? null,
        createdBy: props.auditable.createdBy ?? ID_USER_DEFAULT,
        updatedBy: props.auditable.updatedBy ?? ID_USER_DEFAULT,
        deletedBy: props.auditable.deletedBy ?? null,
      },
    });
  }
}
