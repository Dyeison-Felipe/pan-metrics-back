import { SetMetadata } from "@nestjs/common";
import { Roles } from "../enums/casl.enum";

export const RequiredRoles = (...roles: Roles[]) => SetMetadata('roles', roles);