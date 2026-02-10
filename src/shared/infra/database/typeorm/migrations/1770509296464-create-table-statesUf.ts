import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableStatesUf1770509296464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "states",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()", // continua útil para inserts futuros
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
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "created_by",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "updated_by",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "deleted_by",
            type: "uuid",
            isNullable: true,
          },
        ],
        comment: "Unidades Federativas",
      })
    );

    // ✅ insert com UUID fixo
    await queryRunner.manager.insert("states", [
      { id: "90c5e9f3-df4c-4a22-a3ab-29c42fd3b4d2", name: "Acre", uf: "AC" },
      { id: "f53dcfe1-c291-4e57-855e-385a2e6c790b", name: "Alagoas", uf: "AL" },
      { id: "721f0157-0811-45db-a215-64c3ec5dc3ad", name: "Amazonas", uf: "AM" },
      { id: "f2230f10-7dbc-4f7d-820f-ed3da16c9561", name: "Amapá", uf: "AP" },
      { id: "64073f48-1600-4f9c-816f-c4a72a55170e", name: "Bahia", uf: "BA" },
      { id: "25f7d279-3411-4f58-99ae-2a2b874fa35b", name: "Ceará", uf: "CE" },
      { id: "9bf70dc2-ec1b-4e4a-9e4e-c3b952343627", name: "Distrito Federal", uf: "DF" },
      { id: "c441596d-2b12-4b8d-a86c-b86654c3bf2c", name: "Espírito Santo", uf: "ES" },
      { id: "983e78eb-d82d-4e06-9f7e-4d5501bc45a0", name: "Goiás", uf: "GO" },
      { id: "2733c254-3635-478a-bf74-a6f747125932", name: "Maranhão", uf: "MA" },
      { id: "cf797f23-8f2d-49f6-a091-f4cd5c5c76fa", name: "Minas Gerais", uf: "MG" },
      { id: "bb1c2dd1-4b02-4854-9be4-702d62be71d4", name: "Mato Grosso do Sul", uf: "MS" },
      { id: "f8448a40-75f8-49e5-a835-e56b09ed7939", name: "Mato Grosso", uf: "MT" },
      { id: "79ea8f5d-6e5a-425c-8719-426b590ce189", name: "Pará", uf: "PA" },
      { id: "533e101a-74fd-4c7c-9fd7-9f4599ce915b", name: "Paraíba", uf: "PB" },
      { id: "3acfae82-4f01-4a45-bbe1-e4107a1acd5f", name: "Pernambuco", uf: "PE" },
      { id: "1f1f572e-8a8d-4c71-8700-7bff6bf6fbf0", name: "Piauí", uf: "PI" },
      { id: "d5c1ed3b-47f9-4be5-a16f-1b4c1c352597", name: "Paraná", uf: "PR" },
      { id: "66a3747f-c0d7-4d22-a0ce-b185a5139ac9", name: "Rio de Janeiro", uf: "RJ" },
      { id: "b08a11cc-06e6-4327-b91d-9645039e2c07", name: "Rio Grande do Norte", uf: "RN" },
      { id: "d50f5445-f9ae-47a9-ae9a-3984c3590bbf", name: "Rondônia", uf: "RO" },
      { id: "26560324-1839-4577-9398-2f17df9a9e2e", name: "Roraima", uf: "RR" },
      { id: "ae2b9456-7596-4a12-9c28-8e45c14a9776", name: "Rio Grande do Sul", uf: "RS" },
      { id: "d25a7b44-d257-4b26-8e27-16ade50c4597", name: "Santa Catarina", uf: "SC" },
      { id: "c338a0b0-7c30-47dd-9431-53d7d4724b9c", name: "Sergipe", uf: "SE" },
      { id: "4465b694-f13c-4639-9db6-9104ebc98650", name: "São Paulo", uf: "SP" },
      { id: "3b19dac8-8de5-4f58-8b66-9e63cf3b84b5", name: "Tocantins", uf: "TO" },
      { id: "bd960432-1219-4205-8cd4-7496d571133e", name: "Exterior", uf: "EX" },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("states");
  }
}
