import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Image } from '../images/entities/image.entity';
import { UtilService } from '../util.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PeopleService {
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

  async create(createPersonDto: CreatePersonDto) {
    const {
      homeworldId,
      filmsIds,
      speciesIds,
      vehiclesIds,
      starshipsIds,
      imagesIds,
      ...personData
    } = createPersonDto;

    const homeworld = await this.planetRepository.findOneBy({ id: homeworldId });
    if (!homeworld) throw new NotFoundException(`Homeworld with ID ${homeworldId} not found`);
    const films = await this.filmRepository.findBy({ id: In(filmsIds || []) });
    const species = await this.speciesRepository.findBy({ id: In(speciesIds || []) });
    const vehicles = await this.vehicleRepository.findBy({ id: In(vehiclesIds || []) });
    const starships = await this.starshipRepository.findBy({ id: In(starshipsIds || []) });
    const images = await this.imageRepository.findBy({ id: In(imagesIds || []) });

    const person = this.personRepository.create({
      id: await this.utilService.getNextId(this.personRepository, 'person'),
      ...personData,
      homeworld,
      films,
      species,
      vehicles,
      starships,
      images,
    });

    return await this.personRepository.save(person);
  }

  async getPage(options: IPaginationOptions) {
    return paginate(this.personRepository, options);
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['films', 'species', 'vehicles', 'starships', 'images'],
    });

    if (!person) throw new NotFoundException(`Person with ID ${id} not found`);

    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);

    this.utilService.updateFields(person, updatePersonDto);

    person.homeworld = await this.utilService.returnEntitiesToUpdate(updatePersonDto.homeworldId, this.planetRepository);
    person.films = await this.utilService.returnEntitiesToUpdate(updatePersonDto.filmsIds, this.filmRepository);
    person.species = await this.utilService.returnEntitiesToUpdate(updatePersonDto.speciesIds, this.speciesRepository);
    person.vehicles = await this.utilService.returnEntitiesToUpdate(updatePersonDto.vehiclesIds, this.vehicleRepository);
    person.starships = await this.utilService.returnEntitiesToUpdate(updatePersonDto.starshipsIds, this.starshipRepository);
    person.images = await this.utilService.returnEntitiesToUpdate(updatePersonDto.imagesIds, this.imageRepository);

    return await this.personRepository.save(person);
  }

  async remove(id: number) {
    return this.personRepository.delete(id);
  }
}
