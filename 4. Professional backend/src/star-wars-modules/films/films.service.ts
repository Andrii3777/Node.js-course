import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { In, Repository } from 'typeorm';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { UtilService } from '../util.service';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Image } from '../images/entities/image.entity';

@Injectable()
export class FilmsService {
  constructor(
    private readonly utilService: UtilService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createFilmDto: CreateFilmDto) {
    const {
      charactersIds,
      planetsIds,
      starshipsIds,
      vehiclesIds,
      speciesIds,
      imagesIds,
      ...filmData
    } = createFilmDto;

    const characters = await this.personRepository.findBy({ id: In(charactersIds || []) });
    const planets = await this.planetRepository.findBy({ id: In(planetsIds || []) });
    const starships = await this.starshipRepository.findBy({ id: In(starshipsIds || []) });
    const vehicles = await this.vehicleRepository.findBy({ id: In(vehiclesIds || []) });
    const species = await this.speciesRepository.findBy({ id: In(speciesIds || []) });
    const images = await this.imageRepository.findBy({ id: In(imagesIds || []) });

    const film = this.filmRepository.create({
      id: await this.utilService.getNextId(this.filmRepository, 'film'),
      ...filmData,
      characters,
      planets,
      starships,
      vehicles,
      species,
      images,
    });

    return await this.filmRepository.save(film);
  }

  async findAll() {
    return this.filmRepository.find();
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOneBy({ id });

    if (!film) throw new NotFoundException(`Film with ID ${id} not found`);

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.findOne(id);

    this.utilService.updateFields(film, updateFilmDto);

    film.characters = await this.utilService.returnEntitiesToUpdate(updateFilmDto.charactersIds, this.personRepository);
    film.planets = await this.utilService.returnEntitiesToUpdate(updateFilmDto.planetsIds, this.planetRepository);
    film.starships = await this.utilService.returnEntitiesToUpdate(updateFilmDto.starshipsIds, this.starshipRepository);
    film.vehicles = await this.utilService.returnEntitiesToUpdate(updateFilmDto.vehiclesIds, this.vehicleRepository);
    film.species = await this.utilService.returnEntitiesToUpdate(updateFilmDto.speciesIds, this.speciesRepository);
    film.images = await this.utilService.returnEntitiesToUpdate(updateFilmDto.imagesIds, this.imageRepository);

    return await this.filmRepository.save(film);
  }

  async remove(id: number) {
    return this.filmRepository.delete(id);
  }
}