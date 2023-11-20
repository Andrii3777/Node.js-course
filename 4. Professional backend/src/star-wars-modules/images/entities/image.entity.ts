import { ApiProperty } from "@nestjs/swagger";
import { junctionTables } from "src/common/config/starwars.config";
import { Film } from "src/star-wars-modules/films/entities/film.entity";
import { Person } from "src/star-wars-modules/people/entities/person.entity";
import { Planet } from "src/star-wars-modules/planets/entities/planet.entity";
import { Species } from "src/star-wars-modules/species/entities/species.entity";
import { Starship } from "src/star-wars-modules/starships/entities/starship.entity";
import { Vehicle } from "src/star-wars-modules/vehicles/entities/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'image.jpg' })
    filename: string;

    @Column({ unique: true })
    @ApiProperty({ example: 'https://nestjs-test37-uploader.s3.amazonaws.com/image.jpg' })
    link: string;

    @ManyToMany(() => Film, film => film.images)
    @JoinTable({ name: junctionTables.image_film })
    films: Film[];

    @ManyToMany(() => Person, person => person.images)
    @JoinTable({ name: junctionTables.image_person })
    people: Person[];

    @ManyToMany(() => Planet, planet => planet.images)
    @JoinTable({ name: junctionTables.image_planet })
    planets: Planet[];

    @ManyToMany(() => Species, species => species.images)
    @JoinTable({ name: junctionTables.image_species })
    species: Species[];

    @ManyToMany(() => Vehicle, vehicle => vehicle.images)
    @JoinTable({ name: junctionTables.image_vehicle })
    vehicles: Vehicle[];

    @ManyToMany(() => Starship, starship => starship.images)
    @JoinTable({ name: junctionTables.image_starship })
    starships: Starship[];
}