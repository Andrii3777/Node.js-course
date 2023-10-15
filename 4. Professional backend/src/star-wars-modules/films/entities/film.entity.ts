import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { junctionTables } from "src/config/starwars.config";
import { ApiProperty } from '@nestjs/swagger';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Planet } from 'src/star-wars-modules/planets/entities/planet.entity';
import { Starship } from 'src/star-wars-modules/starships/entities/starship.entity';
import { Vehicle } from 'src/star-wars-modules/vehicles/entities/vehicle.entity';
import { Species } from 'src/star-wars-modules/species/entities/species.entity';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';

@Entity()
export class Film {
    @PrimaryColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'The Phantom Menace' })
    title: string;

    @Column()
    @ApiProperty({ example: '1' })
    episode_id: string;

    @Column('text')
    @ApiProperty({ example: 'Turmoil has engulfed the Galactic Republic...' })
    opening_crawl: string;

    @Column()
    @ApiProperty({ example: 'George Lucas' })
    director: string;

    @Column()
    @ApiProperty({ example: 'Rick McCallum' })
    producer: string;

    @Column()
    @ApiProperty({ example: '1999-05-19' })
    release_date: string;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-10T14:23:31.880Z' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-20T19:49:45.256Z' })
    edited: Date;

    @Column()
    @ApiProperty({ example: 'https://swapi.dev/api/films/1/' })
    url: string;

    @ManyToMany(() => Person, person => person.films)
    @JoinTable({ name: junctionTables.film_person })
    characters: Person[];

    @ManyToMany(() => Planet, planet => planet.films)
    @JoinTable({ name: junctionTables.film_planet })
    planets: Planet[];

    @ManyToMany(() => Starship, starship => starship.films)
    @JoinTable({ name: junctionTables.film_starship })
    starships: Starship[];

    @ManyToMany(() => Vehicle, vehicle => vehicle.films)
    @JoinTable({ name: junctionTables.film_vehicle })
    vehicles: Vehicle[];

    @ManyToMany(() => Species, species => species.films)
    @JoinTable({ name: junctionTables.film_species })
    species: Species[];

    @ManyToMany(() => Image, image => image.films)
    images: Image[];

    constructor(film: Partial<Film>) { // make easy to create new entities in the future and not have to keep upfdating the property
        Object.assign(this, film);
    }
}
