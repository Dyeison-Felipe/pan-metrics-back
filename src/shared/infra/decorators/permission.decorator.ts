import { PermissionRef } from '@/core/auth/domain/permissions-definition/persmissions';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'PERMISSIONS';

export const IS_PUBLIC_KEY = 'IS_PUBLIC';

export const Permission = (...permissions: PermissionRef[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
