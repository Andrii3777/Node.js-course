import * as dotenv from 'dotenv';
dotenv.config();

export const junctionTables = {
    film_person: process.env.MYSQL_FILM_PERSON_TABLE as string,
    film_planet: process.env.MYSQL_FILM_PLANET_TABLE as string,
    film_species: process.env.MYSQL_FILM_SPECIES_TABLE as string,
    film_starship: process.env.MYSQL_FILM_STARSHIP_TABLE as string,
    film_vehicle: process.env.MYSQL_FILM_VEHICLE_TABLE as string,

    person_species: process.env.MYSQL_PERSON_SPECIES_TABLE as string,
    person_starship: process.env.MYSQL_PERSON_STARSHIP_TABLE as string,
    person_vehicle: process.env.MYSQL_PERSON_VEHICLE_TABLE as string,

    image_film: process.env.MYSQL_IMAGE_FILM_TABLE as string,
    image_person: process.env.MYSQL_IMAGE_PERSON_TABLE as string,
    image_planet: process.env.MYSQL_IMAGE_PLANET_TABLE as string,
    image_species: process.env.MYSQL_IMAGE_SPECIES_TABLE as string,
    image_starship: process.env.MYSQL_IMAGE_STARSHIP_TABLE as string,
    image_vehicle: process.env.MYSQL_IMAGE_VEHICLE_TABLE as string,
};

export const entities = {
    planets: process.env.ENTITY_PLANETS as string,
    starships: process.env.ENTITY_STARSHIPS as string,
    vehicles: process.env.ENTITY_VEHICLES as string,
    species: process.env.ENTITY_SPECIES as string,
    people: process.env.ENTITY_PEOPLE as string,
    films: process.env.ENTITY_FILMS as string,
};

export const seedUrl = process.env.SEED_URL as string;