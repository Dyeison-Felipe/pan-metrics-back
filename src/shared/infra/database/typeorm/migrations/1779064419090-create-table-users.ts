import { ID_USER_DEFAULT } from '@/shared/application/constants/id-user-default';
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
            isNullable: false,
          },
          {
            name: 'updated_by',
            type: 'uuid',
            isNullable: false,
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

    await queryRunner.query(`
      INSERT INTO users (id, username, email, password, active, role, company, created_at, updated_at, created_by, updated_by)
      VALUES (
        '${ID_USER_DEFAULT}',
        'system',
        'system@system.com',
        '$2b$10$Tb521IWDL7F18DGI6rDZr.A0NaOu1hkHyFuHbotlem/PBh7Y0oSnK',
        true,
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
        now(),
        now(),
        '${ID_USER_DEFAULT}',
        '${ID_USER_DEFAULT}'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
