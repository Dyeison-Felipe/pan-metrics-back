import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableAddresses1770560255393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // habilita extensão uuid
    // await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'public.uuid_generate_v4()',
          },
          {
            name: 'cep',
            type: 'varchar',
            length: '8',
            isNullable: true,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'latitude',
            type: 'decimal',
            precision: 10,
            scale: 7,
            isNullable: true,
          },
          {
            name: 'longitude',
            type: 'decimal',
            precision: 10,
            scale: 7,
            isNullable: true,
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
            type: 'varchar',
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
          {
            name: 'city',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_addresses_city_id',
            columnNames: ['city'],
            referencedTableName: 'cities',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
        ],
        comment: 'Endereços dos usuários e empresas',
      }),
    );
    await queryRunner.query(`
      INSERT INTO addresses (id, cep, neighborhood, street, number, city, created_by, created_at, updated_at)
      VALUES (
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
        '85070620',
        'Santana',
        'Rua Nova Londrina',
        '247',
        (SELECT id FROM cities WHERE name = 'Guarapuava' LIMIT 1),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        now(),
        now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
