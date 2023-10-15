import { Film } from "src/star-wars-modules/films/entities/film.entity";
import { Planet } from "src/star-wars-modules/planets/entities/planet.entity";
import { Species } from "src/star-wars-modules/species/entities/species.entity";
import { Starship } from "src/star-wars-modules/starships/entities/starship.entity";
import { Vehicle } from "src/star-wars-modules/vehicles/entities/vehicle.entity";
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { junctionTables } from "src/config/starwars.config";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Person {
    @PrimaryColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'Luke Skywalker' })
    name: string;

    @Column()
    @ApiProperty({ example: '172' })
    height: string;

    @Column()
    @ApiProperty({ example: '77' })
    mass: string;

    @Column()
    @ApiProperty({ example: 'blond' })
    hair_color: string;

    @Column()
    @ApiProperty({ example: 'fair' })
    skin_color: string;

    @Column()
    @ApiProperty({ example: 'blue' })
    eye_color: string;

    @Column()
    @ApiProperty({ example: '19BBY' })
    birth_year: string;

    @Column()
    @ApiProperty({ example: 'male' })
    gender: string;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '1999-05-19' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-10T14:23:31.880Z' })
    edited: Date;

    @Column()
    @ApiProperty({ example: 'https://swapi.dev/api/people/1/' })
    url: string;

    @ManyToOne(() => Planet, planet => planet.residents)
    homeworld?: Planet;

    @ManyToMany(() => Film, film => film.characters)
    films: Film[];

    @ManyToMany(() => Species, species => species.people)
    @JoinTable({ name: junctionTables.person_species })
    species: Species[];

    @ManyToMany(() => Vehicle, vehicle => vehicle.pilots)
    @JoinTable({ name: junctionTables.person_vehicle })
    vehicles: Vehicle[];

    @ManyToMany(() => Starship, starship => starship.pilots)
    @JoinTable({ name: junctionTables.person_starship })
    starships: Starship[];

    @ManyToMany(() => Image, image => image.people)
    images: Image[];

    constructor(film: Partial<Person>) { // make easy to create new entities in the future and not have to keep upfdating the property
        Object.assign(this, film);
    }
}
