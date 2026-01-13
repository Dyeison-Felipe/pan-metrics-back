import { Column, Entity } from "typeorm";
import { BaseSchema } from "../../../../shared/infra/database/typeorm/schema/baseSchema";

@Entity('users')
export class UserSchema extends BaseSchema {
  @Column({name: 'username', nullable: false, type: 'varchar', length: 255})
  username: string;

  @Column({name: 'password', nullable: false, type: 'varchar', length: 255})
  password: string;

  @Column({name: 'email', nullable: false, type: 'varchar', length: 255})
  email: string;

  @Column({name: 'phone_number', nullable: false, type: 'varchar', length: 11})
  phoneNumber: string;
}