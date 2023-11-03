import { Film } from 'src/star-wars-modules/films/entities/film.entity';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Planet {
    @PrimaryColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'Tatooine' })
    name: string;

    @Column()
    @ApiProperty({ example: '23' })
    rotation_period: string;

    @Column()
    @ApiProperty({ example: '304' })
    orbital_period: string;

    @Column()
    @ApiProperty({ example: '10465' })
    diameter: string;

    @Column()
    @ApiProperty({ example: 'arid' })
    climate: string;

    @Column()
    @ApiProperty({ example: '1 standard' })
    gravity: string;

    @Column()
    @ApiProperty({ example: 'desert' })
    terrain: string;

    @Column()
    @ApiProperty({ example: '1' })
    surface_water: string;

    @Column()
    @ApiProperty({ example: '200000' })
    population: string;

    @ApiProperty({ example: '1999-05-19' })
    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-20T19:49:45.256Z' })
    edited: Date;

    @Column()
    @ApiProperty({ example: 'https://swapi.dev/api/planets/1/' })
    url: string;

    @OneToMany(() => Person, person => person.homeworld)
    residents: Person[];

    @ManyToMany(() => Film, film => film.planets)
    films: Film[];

    @ManyToMany(() => Image, image => image.planets)
    images: Image[];

    constructor(film: Partial<Planet>) { // make easy to create new entities in the future and not have to keep upfdating the property
        Object.assign(this, film);
    }
}
