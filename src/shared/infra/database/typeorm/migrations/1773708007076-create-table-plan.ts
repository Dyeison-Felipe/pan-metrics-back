import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePlan1773708007076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
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
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                  },
                  {
                    name: 'duration',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                  },
                  {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
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
