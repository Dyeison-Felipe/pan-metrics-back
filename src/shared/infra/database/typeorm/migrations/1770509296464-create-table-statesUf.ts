import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableStatesUf1770509296464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    // habilita extensão uuid
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "states",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
            length: "75",
            isNullable: false,
          },
          {
            name: "uf",
            type: "varchar",
            length: "2",
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updated_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'deleted_by',
            type: 'uuid',
            isNullable: true,
          },
        ],
        comment: "Unidades Federativas",
      })
    );

    // agora sem id manual — banco gera UUID
    await queryRunner.manager.insert("states", [
      { name: "Acre", uf: "AC" },
      { name: "Alagoas", uf: "AL" },
      { name: "Amazonas", uf: "AM" },
      { name: "Amapá", uf: "AP" },
      { name: "Bahia", uf: "BA" },
      { name: "Ceará", uf: "CE" },
      { name: "Distrito Federal", uf: "DF" },
      { name: "Espírito Santo", uf: "ES" },
      { name: "Goiás", uf: "GO" },
      { name: "Maranhão", uf: "MA" },
      { name: "Minas Gerais", uf: "MG" },
      { name: "Mato Grosso do Sul", uf: "MS" },
      { name: "Mato Grosso", uf: "MT" },
      { name: "Pará", uf: "PA" },
      { name: "Paraíba", uf: "PB" },
      { name: "Pernambuco", uf: "PE" },
      { name: "Piauí", uf: "PI" },
      { name: "Paraná", uf: "PR" },
      { name: "Rio de Janeiro", uf: "RJ" },
      { name: "Rio Grande do Norte", uf: "RN" },
      { name: "Rondônia", uf: "RO" },
      { name: "Roraima", uf: "RR" },
      { name: "Rio Grande do Sul", uf: "RS" },
      { name: "Santa Catarina", uf: "SC" },
      { name: "Sergipe", uf: "SE" },
      { name: "São Paulo", uf: "SP" },
      { name: "Tocantins", uf: "TO" },
      { name: "Exterior", uf: "EX" },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("states");
  }
}
