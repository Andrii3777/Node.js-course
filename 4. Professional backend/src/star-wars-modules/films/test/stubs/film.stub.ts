import { CreateFilmDto } from "../../dto/create-film.dto";
import { UpdateFilmDto } from "../../dto/update-film.dto";
import { Film } from "../../entities/film.entity";

export const filmStub = (): Film => {
    return {
        id: 1,
        title: "The Phantom Menace",
        episode_id: "1",
        opening_crawl: "Turmoil has engulfed the Galactic Republic...",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "1999-05-19",
        url: "https://swapi.dev/api/films/1/",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        images: [],
        created: new Date("2014-12-10T13:52:11.567Z"),
        edited: new Date("2014-12-20T21:36:42.136Z"),
    }
}

export const jsonFilmStub = () => {
    return {
        ...filmStub(),
        created: filmStub().created.toISOString(),
        edited: filmStub().edited.toISOString(),
    }
};

export const updateFilmStub = (): Film => {
    return {
        id: 1,
        title: updateFilmDto().title,
        episode_id: updateFilmDto().episode_id,
        opening_crawl: "Turmoil has engulfed the Galactic Republic...",
        director: "George Lucas",
        producer: "Rick McCallum",
        release_date: "1999-05-19",
        url: "https://swapi.dev/api/films/1/",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        images: [],
        created: new Date("2014-12-10T13:52:11.567Z"),
        edited: new Date("2014-12-20T21:36:42.136Z"),
    }
}

export const jsonUpdateFilmStub = () => {
    return {
        ...updateFilmStub(),
        created: updateFilmStub().created.toISOString(),
        edited: updateFilmStub().edited.toISOString(),
    }
};

export const createFilmDto = (): CreateFilmDto => {
    return {
        title: filmStub().title,
        episode_id: filmStub().episode_id,
        opening_crawl: filmStub().opening_crawl,
        director: filmStub().director,
        producer: filmStub().producer,
        release_date: filmStub().release_date,
        url: filmStub().url,
        charactersIds: [],
        planetsIds: [],
        starshipsIds: [],
        vehiclesIds: [],
        speciesIds: [],
        imagesIds: [],
    }
}

export const updateFilmDto = (): UpdateFilmDto => {
    return {
        title: "new title",
        episode_id: "2",
    }
}