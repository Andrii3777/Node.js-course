import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Species } from './entities/species.entity';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Image } from '../images/entities/image.entity';
import { UtilService } from '../util.service';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
    private readonly utilService: UtilService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createSpeciesDto: CreateSpeciesDto) {
    const {
      peopleIds,
      filmsIds,
      imagesIds,
      ...speciesData
    } = createSpeciesDto;

    const people = await this.personRepository.findBy({ id: In(peopleIds || []) });
    const films = await this.filmRepository.findBy({ id: In(filmsIds || []) });
    const images = await this.imageRepository.findBy({ id: In(imagesIds || []) });

    const species = this.speciesRepository.create({
      id: await this.utilService.getNextId(this.speciesRepository, 'species'),
      ...speciesData,
      people,
      films,
      images,
    });

    return await this.speciesRepository.save(species);
  }

  async findAll() {
    return this.speciesRepository.find();
  }

  async findOne(id: number) {
    const species = await this.speciesRepository.findOneBy({ id });

    if (!species) throw new NotFoundException(`Species with ID ${id} not found`);

    return species;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const species = await this.findOne(id);

    this.utilService.updateFields(species, updateSpeciesDto);

    species.people = await this.utilService.returnEntitiesToUpdate(updateSpeciesDto.peopleIds, this.personRepository);
    species.films = await this.utilService.returnEntitiesToUpdate(updateSpeciesDto.filmsIds, this.filmRepository);
    species.images = await this.utilService.returnEntitiesToUpdate(updateSpeciesDto.imagesIds, this.imageRepository);

    return await this.speciesRepository.save(species);
  }

  async remove(id: number) {
    return this.speciesRepository.delete(id);
  }
}
