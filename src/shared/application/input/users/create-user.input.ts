export type CreateUserInput = {
  username: string;
  password: string;
  email: string;
  role: string
  permissionsId: string[]
}