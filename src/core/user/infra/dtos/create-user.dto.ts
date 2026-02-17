import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ description: 'username do usuário' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  @IsString()
  @IsEmail({}, { message: 'Email inválido' })
  @Matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    { message: 'Formato de email inválido' }
  )
  email: string;
}