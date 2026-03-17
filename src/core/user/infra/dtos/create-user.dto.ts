import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ description: 'username do usuário', type: String, maxLength: 255 })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Senha do usuário', type: String, maxLength: 255 })
  @IsString()
  password: string;

  @ApiProperty({ description: 'E-mail do usuário', type: String, maxLength: 255 })
  @IsString()
  @IsEmail({}, { message: 'Email inválido' })
  @Matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    { message: 'Formato de email inválido' }
  )
  email: string;
}