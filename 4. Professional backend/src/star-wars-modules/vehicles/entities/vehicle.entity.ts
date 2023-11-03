import { Film } from 'src/star-wars-modules/films/entities/film.entity';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Vehicle {
    @PrimaryColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'Sand Crawler' })
    name: string;

    @Column()
    @ApiProperty({ example: 'Digger Crawler' })
    model: string;

    @Column()
    @ApiProperty({ example: 'Corellia Mining Corporation' })
    manufacturer: string;

    @Column()
    @ApiProperty({ example: '150000' })
    cost_in_credits: string;

    @Column()
    @ApiProperty({ example: '36.8' })
    length: string;

    @Column()
    @ApiProperty({ example: '30' })
    max_atmosphering_speed: string;

    @Column()
    @ApiProperty({ example: '46' })
    crew: string;

    @Column()
    @ApiProperty({ example: '30' })
    passengers: string;

    @Column()
    @ApiProperty({ example: '50000' })
    cargo_capacity: string;

    @Column()
    @ApiProperty({ example: '2 months' })
    consumables: string;

    @Column()
    @ApiProperty({ example: 'wheeled' })
    vehicle_class: string;

    @ApiProperty({ example: '1999-05-19' })
    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-20T19:49:45.256Z' })
    edited: Date;

    @Column()
    @ApiProperty({ example: 'https://swapi.dev/api/vehicles/1/' })
    url: string;

    @ManyToMany(() => Person, person => person.vehicles)
    pilots: Person[];

    @ManyToMany(() => Film, film => film.vehicles)
    films: Film[];

    @ManyToMany(() => Image, image => image.vehicles)
    images: Image[];

    constructor(film: Partial<Vehicle>) { // make easy to create new entities in the future and not have to keep upfdating the property
        Object.assign(this, film);
    }
}
