import { Test } from "@nestjs/testing"
import { FilmsController } from "../films.controller";
import { FilmsService } from "../films.service";
import { Film } from "../entities/film.entity";
import { createFilmDto, filmStub, updateFilmDto, updateFilmStub } from "./stubs/film.stub";
import { IPaginationOptions} from 'nestjs-typeorm-paginate';

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

  describe('getPage()', () => {
    const paginationOptions: IPaginationOptions = { page: 1, limit: 1 };
    let paginatedFilms: { items: Film[]; meta: any };

    beforeEach(async () => {
      paginatedFilms = await filmsController.getPage(+paginationOptions.page, +paginationOptions.limit);
    })

    test('then it should call filmsService.getPage with the correct options', async () => {
      expect(filmsService.getPage).toHaveBeenCalledWith(paginationOptions);
    });

    test('should return paginated films', async () => {
      expect(paginatedFilms).toEqual(paginatedFilms);
    });
  });

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