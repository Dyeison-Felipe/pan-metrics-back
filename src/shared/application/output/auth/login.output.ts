import { FindByUserId } from '../users/find-user-by-id.output';

export type LoginOutput = {
  user: FindByUserId;
  token?: string;
};
