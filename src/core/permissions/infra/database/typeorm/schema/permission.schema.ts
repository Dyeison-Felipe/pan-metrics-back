import { BaseSchema } from "@/shared/infra/database/typeorm/schema/baseSchema/baseSchema";
import { Column, Entity } from "typeorm";

@Entity('permissions')
export class PermissionSchema extends BaseSchema {
  @Column({name: 'resource', nullable: false, unique: true})
  resource: string;
}