import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePlan1778247383889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'public.uuid_generate_v4()',
          },
          {
            name: 'fantasy_name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'social_reazon',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '13',
            isNullable: true,
          },
          {
            name: 'logotipo',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'plan',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'uuid',
            isNullable: false,
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
        foreignKeys: [
          {
            name: 'fk_company_plan',
            columnNames: ['plan'],
            referencedTableName: 'plan',
            referencedColumnNames: ['id'],
          },
          {
            name: 'fk_company_address',
            columnNames: ['address'],
            referencedTableName: 'addresses',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );

    await queryRunner.query(`
      INSERT INTO companies (id, fantasy_name, social_reazon, cnpj, email, phone_number, active, plan, address, created_by, updated_by, created_at, updated_at)
      VALUES (
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
        'CodeForge',
        'Dyeison Felipe Kreuz',
        '00000000000000',
        'dyeisonfc@gmail.com.br',
        '00000000000',
        true,
        'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        now(),
        now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
