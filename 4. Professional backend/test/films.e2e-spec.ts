import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { FilmsModule } from 'src/star-wars-modules/films/films.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from 'src/star-wars-modules/films/entities/film.entity';
import { mockFilmRepository, mockImageRepository, mockPersonRepository, mockPlanetRepository, mockSpeciesRepository, mockStarshipRepository, mockUtilService, mockVehicleRepository } from 'src/star-wars-modules/films/test/mockRepository/mock.repository';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Planet } from 'src/star-wars-modules/planets/entities/planet.entity';
import { Species } from 'src/star-wars-modules/species/entities/species.entity';
import { Starship } from 'src/star-wars-modules/starships/entities/starship.entity';
import { UtilService } from 'src/star-wars-modules/util.service';
import { Vehicle } from 'src/star-wars-modules/vehicles/entities/vehicle.entity';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { createFilmDto, jsonFilmStub, jsonUpdateFilmStub, updateFilmDto } from 'src/star-wars-modules/films/test/stubs/film.stub';

describe('FilmsController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [FilmsModule],
        })
            .overrideProvider(getRepositoryToken(Film))
            .useValue(mockFilmRepository)
            .overrideProvider(UtilService)
            .useValue(mockUtilService)
            .overrideProvider(getRepositoryToken(Person))
            .useValue(mockPersonRepository)
            .overrideProvider(getRepositoryToken(Planet))
            .useValue(mockPlanetRepository)
            .overrideProvider(getRepositoryToken(Species))
            .useValue(mockSpeciesRepository)
            .overrideProvider(getRepositoryToken(Vehicle))
            .useValue(mockVehicleRepository)
            .overrideProvider(getRepositoryToken(Starship))
            .useValue(mockStarshipRepository)
            .overrideProvider(getRepositoryToken(Image))
            .useValue(mockImageRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/films (POST)', () => {
        return request(app.getHttpServer())
            .post('/films')
            .send(createFilmDto())
            .expect(201)
            .expect((response) => {
                expect(response.body).toEqual(jsonFilmStub());
            });
    });

    it('/films (GET)', () => {
        return request(app.getHttpServer())
            .get('/films')
            .expect(200)
            .expect((response) => {
                expect(response.body).toEqual([jsonFilmStub()]);
            });
    });

    it('/films/:id (GET)', () => {
        return request(app.getHttpServer())
            .get('/films/1')
            .expect(200)
            .expect((response) => {
                expect(response.body).toEqual(jsonFilmStub());
            });
    });

    it('/films/:id (PATCH)', () => {
        jest.spyOn(mockFilmRepository, 'save').mockResolvedValue(jsonUpdateFilmStub());

        return request(app.getHttpServer())
            .patch('/films/1')
            .send(updateFilmDto())
            .expect(200)
            .expect((response) => {
                expect(response.body).toEqual(jsonUpdateFilmStub());
            });
    });

    it('/films/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/films/1')
            .expect(200)
            .expect((response) => {
                expect(response.body).toEqual({
                    "raw": [],
                    "affected": 1
                });
            });
    });
});
