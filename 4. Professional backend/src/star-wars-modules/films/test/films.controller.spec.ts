import { Test } from "@nestjs/testing"
import { FilmsController } from "../films.controller";
import { FilmsService } from "../films.service";
import { Film } from "../entities/film.entity";
import { createFilmDto, filmStub, updateFilmDto, updateFilmStub } from "./stubs/film.stub";

jest.mock('../films.service.ts');

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [FilmsController],
      providers: [FilmsService]
    }).compile();

    filmsController = moduleRef.get<FilmsController>(FilmsController);
    filmsService = moduleRef.get<FilmsService>(FilmsService);
    jest.clearAllMocks();
  })

  describe('create()', () => {
    describe('when create() is called', () => {
      let user: Film;

      beforeEach(async () => {
        user = await filmsController.create(createFilmDto());
      })

      test('then it should call filmsService', () => {
        expect(filmsService.create).toHaveBeenCalledWith(createFilmDto());
      })

      test('then it should return a film', () => {
        expect(user).toEqual(filmStub())
      })
    })
  })

  describe('findOne()', () => {
    describe('when findOne() is called', () => {
      let film: Film;

      beforeEach(async () => {
        film = await filmsController.findOne(filmStub().id + '');
      })

      test('then it should call filmsService', () => {
        expect(filmsService.findOne).toBeCalledWith(filmStub().id);
      })

      test('then it should return a film', () => {
        expect(film).toEqual(filmStub());
      })
    })
  })

  describe('findAll()', () => {
    describe('when findAll() is called', () => {
      let films: Film[];

      beforeEach(async () => {
        films = await filmsController.findAll();
      })

      test('then it should call filmsService', () => {
        expect(filmsService.findAll).toHaveBeenCalled();
      })

      test('then it should return films', () => {
        expect(films).toEqual([filmStub()])
      })
    })
  })

  describe('update()', () => {
    describe('when update() is called', () => {
      let film: Film;

      beforeEach(async () => {
        film = await filmsController.update(filmStub().id + '', updateFilmDto());
      })

      test('then it should call filmsService', () => {
        expect(filmsService.update).toHaveBeenCalledWith(filmStub().id, updateFilmDto());
      })

      test('then it should return a film', () => {
        expect(film).toEqual(updateFilmStub())
      })
    })
  })

  describe('remove()', () => {
    describe('when remove() is called', () => {
      let result;

      beforeEach(async () => {
        result = await filmsController.remove(filmStub().id + '');
      })

      test('then it should call filmsService', () => {
        expect(filmsService.remove).toHaveBeenCalledWith(filmStub().id);
      })

      test('then it should return a film', () => {
        expect(result).toEqual({
          "raw": [],
          "affected": 1
        });
      })
    })
  })

})