import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Image } from '../images/entities/image.entity';
import { UtilService } from '../util.service';

@Injectable()
export class PlanetsService {
  constructor(
    private readonly utilService: UtilService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createPlanetDto: CreatePlanetDto) {
    const {
      residentsIds,
      filmsIds,
      imagesIds,
      ...planetData
    } = createPlanetDto;

    const residents = await this.personRepository.findBy({ id: In(residentsIds || []) });
    const films = await this.filmRepository.findBy({ id: In(filmsIds || []) });
    const images = await this.imageRepository.findBy({ id: In(imagesIds || []) });

    const planet = this.planetRepository.create({
      id: await this.utilService.getNextId(this.planetRepository, 'planet'),
      ...planetData,
      residents,
      films,
      images,
    });

    return await this.planetRepository.save(planet);
  }

  async findAll() {
    return this.planetRepository.find();
  }

  async findOne(id: number) {
    const planet = this.planetRepository.findOneBy({ id });

    if (!planet) throw new NotFoundException(`Planet with ID ${id} not found`);

    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const planet = await this.findOne(id);

    this.utilService.updateFields(planet, updatePlanetDto);

    planet.residents = await this.utilService.returnEntitiesToUpdate(updatePlanetDto.residentsIds, this.personRepository);
    planet.films = await this.utilService.returnEntitiesToUpdate(updatePlanetDto.filmsIds, this.filmRepository);
    planet.images = await this.utilService.returnEntitiesToUpdate(updatePlanetDto.imagesIds, this.imageRepository);

    return await this.planetRepository.save(planet);
  }

  async remove(id: number) {
    return this.planetRepository.delete(id);
  }
}
