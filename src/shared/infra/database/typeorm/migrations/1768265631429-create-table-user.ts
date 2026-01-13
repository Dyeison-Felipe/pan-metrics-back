import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1768265631429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                         type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "11"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
