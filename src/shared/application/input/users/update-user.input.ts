export type UpdateUserInput = {
  id: string;
  username: string;
  password?: string;
  permissionsId: string[]
}