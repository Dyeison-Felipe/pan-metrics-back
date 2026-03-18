import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePlanDto {
  @ApiProperty({ description: 'Id do plano' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nome do plano' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do plano' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Preço do plano' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Duração do plano' })
  @IsString()
  duration: string;
}
