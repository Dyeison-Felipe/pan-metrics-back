import { ApiProperty } from "@nestjs/swagger";

export class CreatePlanPresenter {

  @ApiProperty({ description: 'Id do plano' })
  readonly id: string;
  @ApiProperty({ description: 'Nome do plano' })
  readonly name: string;
  @ApiProperty({ description: 'Descrição do plano' })
  readonly description: string;
  @ApiProperty({ description: 'Preço do plano' })
  readonly price: number;
  @ApiProperty({ description: 'Duração do plano' })
  readonly duration: string;
  @ApiProperty({ description: 'Data de criação do plano' })
  readonly createdAt: Date;
  @ApiProperty({ description: 'Data de atualização do plano' })
  readonly updatedAt: Date;
  @ApiProperty({ description: 'Data de exclusão do plano', nullable: true })
  readonly deletedAt?: Date | null;
  @ApiProperty({ description: 'Usuário que criou o plano' })
  readonly createdBy: string;
  @ApiProperty({ description: 'Usuário que atualizou o plano' })
  readonly updatedBy: string;
  @ApiProperty({ description: 'Usuário que excluiu o plano', nullable: true })
  readonly deletedBy?: string | null;

  constructor(props: CreatePlanPresenter) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.duration = props.duration;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
    this.deletedBy = props.deletedBy;
  }
}