import { FindByUserId } from '../users/find-user0by-id.output';

export type LoginOutput = {
  user: FindByUserId;
  token?: string;
};
