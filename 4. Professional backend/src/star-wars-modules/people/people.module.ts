import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Film } from '../films/entities/film.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from '../starships/entities/starship.entity';
import { UtilService } from '../util.service';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Film, Species, Vehicle, Starship, Image])],
  controllers: [PeopleController],
  providers: [PeopleService, UtilService],
})
export class PeopleModule { }
