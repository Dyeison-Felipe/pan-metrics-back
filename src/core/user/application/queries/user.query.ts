import { Role } from "@/core/role/domain/entities/role.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { Company } from "@/core/company/domain/entities/company.entity";

export type PermissionUser = {
    id: string;
    action: string;
    subject: string;
    description: string;
  }

export type UserByLogin = {
  id: string;
  username: string;
  password: string;
  email: string;
  active: boolean;
  role: string;
  permissions?: PermissionUser[] | null;
};

export interface UserQuery {
  findUserByEmail(email: string): Promise<UserByLogin | null>;
}
