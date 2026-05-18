export type UpdateUserInput = {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  permissionsId: string[]
}