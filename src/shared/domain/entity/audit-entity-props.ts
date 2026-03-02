import { UserEntity } from '@core/user/domain/entities/user.entity';

export type AuditableProps = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
};
