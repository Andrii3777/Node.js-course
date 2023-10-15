import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { Starship } from './entities/starship.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { UtilService } from '../util.service';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Image])],
  controllers: [StarshipsController],
  providers: [StarshipsService, UtilService],
})
export class StarshipsModule { }
