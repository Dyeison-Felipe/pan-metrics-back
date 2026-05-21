type PermissionUser = {
    id: string;
    action: string;
    subject: string;
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
