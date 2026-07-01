import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UpdateCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsUUID()
  parentId: string;
}