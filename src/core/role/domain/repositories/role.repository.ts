import { Role } from "../entities/role.entity";

export interface RoleRepository {
  createRole(role: Role): Promise<void>;
  updateRole(role: Role): Promise<void>;
  deletedRole(role: Role): Promise<void>;
  getById(id: string): Promise<Role | null>;
}