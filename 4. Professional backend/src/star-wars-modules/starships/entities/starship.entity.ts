import { Film } from 'src/star-wars-modules/films/entities/film.entity';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Starship {
    @PrimaryColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'CR90 corvette' })
    name: string;

    @Column()
    @ApiProperty({ example: 'CR90 corvette' })
    model: string;

    @Column()
    @ApiProperty({ example: 'Corellian Engineering Corporation' })
    manufacturer: string;

    @Column()
    @ApiProperty({ example: '3500000' })
    cost_in_credits: string;

    @Column()
    @ApiProperty({ example: '150' })
    length: string;

    @Column()
    @ApiProperty({ example: '950' })
    max_atmosphering_speed: string;

    @Column()
    @ApiProperty({ example: '30-165' })
    crew: string;

    @Column()
    @ApiProperty({ example: '600' })
    passengers: string;

    @Column()
    @ApiProperty({ example: '3000000' })
    cargo_capacity: string;

    @Column()
    @ApiProperty({ example: '1 year' })
    consumables: string;

    @Column()
    @ApiProperty({ example: '2.0' })
    hyperdrive_rating: string;

    @Column()
    @ApiProperty({ example: '60' })
    MGLT: string;

    @Column()
    @ApiProperty({ example: 'corvette' })
    starship_class: string;

    @ApiProperty({ example: '1999-05-19' })
    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-20T19:49:45.256Z' })
    edited: Date;

    @Column()
    @ApiProperty({ example: 'https://swapi.dev/api/starships/1/' })
    url: string;

    @ManyToMany(() => Person, person => person.starships)
    pilots: Person[];

    @ManyToMany(() => Film, film => film.starships)
    films: Film[];

    @ManyToMany(() => Image, image => image.starships)
    images: Image[];

    constructor(film: Partial<Starship>) { // make easy to create new entities in the future and not have to keep upfdating the property
        Object.assign(this, film);
    }
}