import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1779064419090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'username',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'password_reset_code',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'expired_at_code',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'company',
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
            name: 'fk_user_role',
            columnNames: ['role'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          },
          {
            name: 'fk_user_company',
            columnNames: ['company'],
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );

    const systemUserId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    await queryRunner.query(`
      INSERT INTO users (id, username, email, password, active, role, company, created_at, updated_at)
      VALUES (
        '${systemUserId}',
        'system',
        'system@system.com',
        'system',
        true,
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
        now(),
        now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
