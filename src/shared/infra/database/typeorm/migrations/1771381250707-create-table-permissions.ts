import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePermissions1771381250707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
            await queryRunner.createTable(
              new Table({
                name: 'permissions',
                columns: [
                  {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    default: "public.uuid_generate_v4()"
                  },
                  {
                    name: 'resource',
                    type: 'varchar',
                    length: '255',
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
              }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
