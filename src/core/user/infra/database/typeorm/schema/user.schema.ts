import { BaseSchema } from '@shared/infra/database/typeorm/schema/baseSchema/baseSchema';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserSchema extends BaseSchema {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  active: boolean;
}
