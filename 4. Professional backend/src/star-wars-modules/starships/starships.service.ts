import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Image } from '../images/entities/image.entity';
import { UtilService } from '../util.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class StarshipsService {
  constructor(
    private readonly utilService: UtilService,
    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createStarshipDto: CreateStarshipDto) {
    const {
      pilotsIds,
      filmsIds,
      imagesIds,
      ...starshipData
    } = createStarshipDto;

    const pilots = await this.personRepository.findBy({ id: In(pilotsIds || []) });
    const films = await this.filmRepository.findBy({ id: In(filmsIds || []) });
    const images = await this.imageRepository.findBy({ id: In(imagesIds || []) });

    const starship = this.starshipRepository.create({
      id: await this.utilService.getNextId(this.starshipRepository, 'starship'),
      ...starshipData,
      pilots,
      films,
      images,
    });

    return await this.starshipRepository.save(starship);
  }

  async getPage(options: IPaginationOptions) {
    return paginate(this.starshipRepository, options);
  }

  async findOne(id: number) {
    const starship = await  this.starshipRepository.findOne({
      where: { id },
      relations: ['pilots', 'films', 'images'],
    });

    if (!starship) throw new NotFoundException(`Starship with ID ${id} not found`);

    return starship;
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const starship = await this.findOne(id);

    this.utilService.updateFields(starship, updateStarshipDto);

    starship.pilots = await this.utilService.returnEntitiesToUpdate(updateStarshipDto.pilotsIds, this.personRepository);
    starship.films = await this.utilService.returnEntitiesToUpdate(updateStarshipDto.filmsIds, this.filmRepository);
    starship.images = await this.utilService.returnEntitiesToUpdate(updateStarshipDto.imagesIds, this.imageRepository);

    return await this.starshipRepository.save(starship);
  }

  async remove(id: number) {
    return this.starshipRepository.delete(id);
  }
}
