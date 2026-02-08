import { BaseSchema } from "@shared/infra/database/typeorm/schema/baseSchema/baseSchema";
import { CitySchema } from "@shared/infra/database/typeorm/schema/city.schema";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('addresses')
export class AddressSchema extends BaseSchema {
    @Column({ name: 'cep', type: 'varchar', nullable: false, length: 8})
    cep: string;

    @Column({name: 'neighborhood', nullable: false, length: 255})
    neighborhood: string;

    @Column({name: 'street', nullable: false, length: 255})
    street: string;

    @Column({name: 'number', nullable: false, length: 10})
    number: string;

    @Column({name: 'complement', nullable: true, length: 255})
    complement: string;

    @Column({name: 'latitude', nullable: true, type: 'decimal', precision: 10, scale: 7})
    latitude: number;

    @Column({name: 'longitude', nullable: true, type: 'decimal', precision: 10, scale: 7})
    longitude: number;

    @JoinColumn({name: 'city', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_addresses_city_id'})
    @ManyToOne(() => CitySchema, city => city.addresses, {nullable: false})
    city: CitySchema;
}