export type UpdateUserInput = {
  id: string;
  username: string;
  email: string;
  password?: string;
  permissionsId: string[]
}