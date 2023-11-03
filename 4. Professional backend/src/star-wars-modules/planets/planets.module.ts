import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { Planet } from './entities/planet.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { UtilService } from '../util.service';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Planet, Film, Image])],
  controllers: [PlanetsController],
  providers: [PlanetsService, UtilService],
})
export class PlanetsModule { }
