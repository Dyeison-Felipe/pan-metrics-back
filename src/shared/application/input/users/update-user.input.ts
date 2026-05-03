export type UpdateUserInput = {
  id: string;
  username: string;
  password?: string;
  email: string;
  permissionsId: string[]
}