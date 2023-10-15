import * as dotenv from 'dotenv';
dotenv.config();

export const junctionTables = {
    film_person: 'film_person',
    film_planet: 'film_planet',
    film_species: 'film_species',
    film_starship: 'film_starship',
    film_vehicle: 'film_vehicle',

    person_species: 'person_species',
    person_starship: 'person_starship',
    person_vehicle: 'person_vehicle',

    image_film: 'image_film',
    image_person: 'image_person',
    image_planet: 'image_planet',
    image_species: 'image_species',
    image_starship: 'image_starship',
    image_vehicle: 'image_vehicle',
};

export const entities = {
    planets: 'planets',
    starships: 'starships',
    vehicles: 'vehicles',
    species: 'species',
    people: 'people',
    films: 'films',
};

export const seedUrl = 'https://swapi.dev/api/';