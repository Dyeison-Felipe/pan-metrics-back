import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'username do usuário',
    type: String,
    maxLength: 255,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'IDs das permissões do usuário',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  permissionsId: string[];
}
