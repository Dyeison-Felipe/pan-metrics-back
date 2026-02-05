import { Body, Controller, Post } from "@nestjs/common";
import { CreateRoleUseCase } from "../../application/usecase/create.usecase";
import { CreateRoleDto } from "../dto/create-role.dto";

@Controller('/role/v1')
export class RoleController {

  constructor(private readonly createRoleUseCase: CreateRoleUseCase) {}

  @Post('/create')
  async createRole(@Body() body: CreateRoleDto): Promise<void> {
    await this.createRoleUseCase.execute(body);
  }

}