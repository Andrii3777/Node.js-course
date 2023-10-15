import { Film } from 'src/star-wars-modules/films/entities/film.entity';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Species {
    @PrimaryColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'Human' })
    name: string;

    @Column()
    @ApiProperty({ example: 'mammal' })
    classification: string;

    @Column()
    @ApiProperty({ example: 'sentient' })
    designation: string;

    @Column()
    @ApiProperty({ example: '180' })
    average_height: string;

    @Column()
    @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
    skin_colors: string;

    @Column()
    @ApiProperty({ example: 'blonde, brown, black, red' })
    hair_colors: string;

    @Column()
    @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
    eye_colors: string;

    @Column()
    @ApiProperty({ example: '120' })
    average_lifespan: string;

    @Column()
    @ApiProperty({ example: 'Galactic Basic' })
    language: string;

    @ApiProperty({ example: '1999-05-19' })
    @CreateDateColumn({ type: 'timestamp' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ example: '2014-12-20T19:49:45.256Z' })
    edited: Date;

    @Column()
    @ApiProperty({ example: 'https://swapi.dev/api/species/1/' })
    url: string;

    @ManyToMany(() => Person, person => person.species)
    people: Person[];

    @ManyToMany(() => Film, film => film.species)
    films: Film[];

    @ManyToMany(() => Image, image => image.species)
    images: Image[];

    constructor(film: Partial<Species>) { // make easy to create new entities in the future and not have to keep upfdating the property
        Object.assign(this, film);
    }
}
