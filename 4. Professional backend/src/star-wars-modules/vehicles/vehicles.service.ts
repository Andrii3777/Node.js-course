import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Image } from '../images/entities/image.entity';
import { UtilService } from '../util.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private readonly utilService: UtilService,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(createVehicleDto: CreateVehicleDto) {
    const {
      pilotsIds,
      filmsIds,
      imagesIds,
      ...vehicleData
    } = createVehicleDto;

    const pilots = await this.personRepository.findBy({ id: In(pilotsIds || []) });
    const films = await this.filmRepository.findBy({ id: In(filmsIds || []) });
    const images = await this.imageRepository.findBy({ id: In(imagesIds || []) });

    const vehicle = this.vehicleRepository.create({
      id: await this.utilService.getNextId(this.vehicleRepository, 'vehicle'),
      ...vehicleData,
      pilots,
      films,
      images,
    });

    return await this.vehicleRepository.save(vehicle);
  }

  async getPage(options: IPaginationOptions) {
    return paginate(this.vehicleRepository, options);
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOneBy({ id });

    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);

    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id);

    this.utilService.updateFields(vehicle, updateVehicleDto);

    vehicle.pilots = await this.utilService.returnEntitiesToUpdate(updateVehicleDto.pilotsIds, this.personRepository);
    vehicle.films = await this.utilService.returnEntitiesToUpdate(updateVehicleDto.filmsIds, this.filmRepository);
    vehicle.images = await this.utilService.returnEntitiesToUpdate(updateVehicleDto.imagesIds, this.imageRepository);

    return await this.vehicleRepository.save(vehicle);
  }

  async remove(id: number) {
    return this.vehicleRepository.delete(id);
  }
}
