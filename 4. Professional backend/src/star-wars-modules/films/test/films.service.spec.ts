import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilmsService } from '../films.service';
import { Film } from '../entities/film.entity';
import { Person } from 'src/star-wars-modules/people/entities/person.entity';
import { Planet } from 'src/star-wars-modules/planets/entities/planet.entity';
import { Species } from 'src/star-wars-modules/species/entities/species.entity';
import { Starship } from 'src/star-wars-modules/starships/entities/starship.entity';
import { UtilService } from 'src/star-wars-modules/util.service';
import { Vehicle } from 'src/star-wars-modules/vehicles/entities/vehicle.entity';
import { createFilmDto, filmStub, updateFilmDto, updateFilmStub } from './stubs/film.stub';
import { Image } from 'src/star-wars-modules/images/entities/image.entity';
import { NotFoundException } from '@nestjs/common';
import { mockFilmRepository, mockUtilService, mockPersonRepository, mockPlanetRepository, mockSpeciesRepository, mockVehicleRepository, mockStarshipRepository, mockImageRepository } from './mockRepository/mock.repository';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn(),
}));

describe('FilmsService', () => {
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
        {
          provide: UtilService,
          useValue: mockUtilService,
        },
        {
          provide: getRepositoryToken(Person),
          useValue: mockPersonRepository,
        },
        {
          provide: getRepositoryToken(Planet),
          useValue: mockPlanetRepository,
        },
        {
          provide: getRepositoryToken(Species),
          useValue: mockSpeciesRepository,
        },
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockVehicleRepository,
        },
        {
          provide: getRepositoryToken(Starship),
          useValue: mockStarshipRepository,
        },
        {
          provide: getRepositoryToken(Image),
          useValue: mockImageRepository,
        },
      ],
    }).compile();

    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmsService).toBeDefined();
  });

  it('should create a film', async () => {
    mockFilmRepository.create.mockReturnValue(filmStub());
    mockFilmRepository.save.mockReturnValue(filmStub());

    const result = await filmsService.create(createFilmDto());

    expect(result).toEqual(filmStub());
    expect(mockFilmRepository.save).toHaveBeenCalledWith(filmStub());
  });

  it('should update a film', async () => {
    jest.spyOn(mockFilmRepository, 'save').mockResolvedValue(updateFilmStub());
    const result = await filmsService.update(1, updateFilmDto());

    expect(result).toEqual(updateFilmStub());
    expect(mockFilmRepository.save).toHaveBeenCalledWith(updateFilmStub());
  });

  describe('getPage', () => {
    it('should return a paginated list of films', async () => {
      const paginationOptions: IPaginationOptions = { page: 1, limit: 1 };
      const mockFilms = [filmStub()];

      const mockPagination = {
        items: mockFilms,
        meta: {
          itemCount: mockFilms.length,
          totalItems: mockFilms.length,
          itemsPerPage: paginationOptions.limit,
          totalPages: 1,
          currentPage: paginationOptions.page,
        },
      };

      (paginate as jest.Mock).mockResolvedValueOnce(mockPagination);

      const result = await filmsService.getPage(paginationOptions);

      expect(result).toEqual(mockPagination);
    });
  });

  describe('findOne', () => {
    it('then it should find a film by ID', async () => {
      const filmId = 1;
      const mockFilm = filmStub();
      mockFilm.id = filmId;

      jest.spyOn(mockFilmRepository, 'findOne').mockResolvedValue(mockFilm);

      const result = await filmsService.findOne(filmId);

      expect(result).toEqual(mockFilm);
    });

    it('then it should throw NotFoundException if film is not found', async () => {
      const filmId = 2;

      jest.spyOn(mockFilmRepository, 'findOne').mockResolvedValue(undefined);

      try {
        await filmsService.findOne(filmId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe(`Film with ID ${filmId} not found`);
      }
    });
  });

  it('should remove a film', async () => {
    const filmId = 1;
    const deleteResult = {
      affected: 1,
      raw: {},
    };

    jest.spyOn(mockFilmRepository, 'delete').mockResolvedValue(deleteResult);

    const result = await filmsService.remove(filmId);

    expect(result).toEqual(deleteResult);
    expect(mockFilmRepository.delete).toHaveBeenCalledWith(filmId);
  });
});
