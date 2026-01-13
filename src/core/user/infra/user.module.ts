import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "./schema/user.schema";

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}