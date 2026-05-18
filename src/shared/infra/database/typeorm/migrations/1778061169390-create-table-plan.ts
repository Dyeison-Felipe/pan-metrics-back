import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCompany1778061169390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plan',
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
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'duration',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
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
        ],
      }),
    );

    await queryRunner.query(`
      INSERT INTO plan (id, name, price, duration, description, active, created_at, updated_at)
      VALUES (
        'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        'Extreme',
        9900,
        '12 meses',
        'Plano Extreme com acesso total a todas as funcionalidades da plataforma',
        true,
        now(),
        now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
