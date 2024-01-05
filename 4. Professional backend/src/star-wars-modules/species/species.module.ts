import { Species } from './entities/species.entity';
import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { UtilService } from '../util.service';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Species, Image])],
  controllers: [SpeciesController],
  providers: [SpeciesService, UtilService],
})
export class SpeciesModule { }
