import { Data } from '@/shared/domain/decorators/data.decorator';
import { BaseEntity } from '@/shared/domain/entity/baseEntity';

type PermissionProps = {
  action: string;
  subject: string;
};

export interface PermissionEntity extends PermissionProps {}

@Data()
export class PermissionEntity extends BaseEntity<PermissionProps> {
  static create(props: PermissionProps): PermissionEntity {
    return new PermissionEntity({
      id: crypto.randomUUID(),
      ...props,
    });
  }
}
