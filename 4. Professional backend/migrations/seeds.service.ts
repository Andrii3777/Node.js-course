import axios from "axios";
import axiosRetry from "axios-retry";
import { entities, junctionTables, seedUrl } from "src/config/starwars.config";
import { Film } from "src/star-wars-modules/films/entities/film.entity";
import { Person } from "src/star-wars-modules/people/entities/person.entity";
import { Planet } from "src/star-wars-modules/planets/entities/planet.entity";
import { Species } from "src/star-wars-modules/species/entities/species.entity";
import { Starship } from "src/star-wars-modules/starships/entities/starship.entity";
import { Vehicle } from "src/star-wars-modules/vehicles/entities/vehicle.entity";
import { QueryRunner } from "typeorm";
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export class SeedsService {
    constructor(private queryRunner: QueryRunner) { }

    async fetchAndInsertDataFromSwapi() {
        for (const key in entities) {
            const entity = entities[key];
            let url = seedUrl + entity;

            while (url) {
                console.log(url);
                const response = await axios.get(url);
                const { results, next } = response.data;

                await this.fillDataTables(entity, results);
                await this.fillJunctionTables(entity, results);

                url = next;
            }
        }
    }

    async clearTables() {
        await this.queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
        await this.queryRunner.query('TRUNCATE TABLE film');
        await this.queryRunner.query('TRUNCATE TABLE film_person');
        await this.queryRunner.query('TRUNCATE TABLE film_planet');
        await this.queryRunner.query('TRUNCATE TABLE film_species');
        await this.queryRunner.query('TRUNCATE TABLE film_starship');
        await this.queryRunner.query('TRUNCATE TABLE film_vehicle');
        await this.queryRunner.query('TRUNCATE TABLE image');
        await this.queryRunner.query('TRUNCATE TABLE image_film');
        await this.queryRunner.query('TRUNCATE TABLE image_person');
        await this.queryRunner.query('TRUNCATE TABLE image_planet');
        await this.queryRunner.query('TRUNCATE TABLE image_species');
        await this.queryRunner.query('TRUNCATE TABLE image_starship');
        await this.queryRunner.query('TRUNCATE TABLE image_vehicle');
        await this.queryRunner.query('TRUNCATE TABLE person');
        await this.queryRunner.query('TRUNCATE TABLE person_species');
        await this.queryRunner.query('TRUNCATE TABLE person_starship');
        await this.queryRunner.query('TRUNCATE TABLE person_vehicle');
        await this.queryRunner.query('TRUNCATE TABLE planet');
        await this.queryRunner.query('TRUNCATE TABLE species');
        await this.queryRunner.query('TRUNCATE TABLE starship');
        await this.queryRunner.query('TRUNCATE TABLE vehicle');
        await this.queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
    }

    private async fillDataTables(entity: string, data: any[]) {
        const connection = this.queryRunner.manager;

        for (const dataItem of data) {
            dataItem.id = this.extractIdFromUrl(dataItem.url);
            if (entity === entities.people) {
                dataItem.homeworld = this.extractIdFromUrl(dataItem.homeworld);
            }
        }

        switch (entity) {
            case entities.films:
                await connection.getRepository(Film).save(data);
                break;
            case entities.planets:
                await connection.getRepository(Planet).save(data);
                break;
            case entities.people:
                await connection.getRepository(Person).save(data);
                break;
            case entities.starships:
                await connection.getRepository(Starship).save(data);
                break;
            case entities.vehicles:
                await connection.getRepository(Vehicle).save(data);
                break;
            case entities.species:
                await connection.getRepository(Species).save(data);
                break;
        }
    }

    private async fillJunctionTables(entity: string, data: any[]) {
        const extractIdsFromUrl = (urls: string[]) => urls.map((url: string) => this.extractIdFromUrl(url));

        if (entity === entities.films) {
            const filmsIds = data.map((filmData) => this.extractIdFromUrl(filmData.url));
            const filmCharactersIds = data.map((filmData) => extractIdsFromUrl(filmData.characters));
            const filmPlanetsIds = data.map((filmData) => extractIdsFromUrl(filmData.planets));
            const filmSpeciesIds = data.map((filmData) => extractIdsFromUrl(filmData.species));
            const filmStarshipsIds = data.map((filmData) => extractIdsFromUrl(filmData.starships));
            const filmVehiclesIds = data.map((filmData) => extractIdsFromUrl(filmData.vehicles));

            await Promise.all([
                this.fillJunctionTable(junctionTables.film_person, filmsIds, filmCharactersIds),
                this.fillJunctionTable(junctionTables.film_planet, filmsIds, filmPlanetsIds),
                this.fillJunctionTable(junctionTables.film_starship, filmsIds, filmStarshipsIds),
                this.fillJunctionTable(junctionTables.film_vehicle, filmsIds, filmVehiclesIds),
                this.fillJunctionTable(junctionTables.film_species, filmsIds, filmSpeciesIds),
            ]);
        }
        if (entity === entities.people) {
            const peopleIds = data.map((peopleData) => this.extractIdFromUrl(peopleData.url));
            const peopleSpeciesIds = data.map((peopleData) => extractIdsFromUrl(peopleData.species));
            const peopleStarshipsIds = data.map((peopleData) => extractIdsFromUrl(peopleData.starships));
            const peopleVehiclesIds = data.map((peopleData) => extractIdsFromUrl(peopleData.vehicles));

            await Promise.all([
                this.fillJunctionTable(junctionTables.person_species, peopleIds, peopleSpeciesIds),
                this.fillJunctionTable(junctionTables.person_vehicle, peopleIds, peopleVehiclesIds),
                this.fillJunctionTable(junctionTables.person_starship, peopleIds, peopleStarshipsIds),
            ]);
        }
    }

    private async fillJunctionTable(tableName: string, filmsOrPeopleIdsArr: number[], relationsIdsArr: number[][]) {
        for (let i = 0; i < relationsIdsArr.length; i++) {
            for (let j = 0; j < relationsIdsArr[i].length; j++) {
                await this.insertConnection(tableName, filmsOrPeopleIdsArr[i], relationsIdsArr[i][j]);
            }
        }
    }

    private async insertConnection(tableName: string, id1: number, id2: number) {
        const [col1, col2] = tableName.split("_");
        await this.queryRunner.query(`INSERT INTO ${tableName}(${col1 + 'Id'}, ${col2 + 'Id'}) VALUES (${id1}, ${id2})`);
    };

    private extractIdFromUrl(url: string): number {
        const match = url.match(/\/(\d+)\/$/);
        return parseInt(match[1]);
    };
}