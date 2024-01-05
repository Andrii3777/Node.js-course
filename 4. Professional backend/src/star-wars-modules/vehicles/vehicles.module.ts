import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Film } from '../films/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { UtilService } from '../util.service';
import { Vehicle } from './entities/vehicle.entity';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Vehicle, Film, Image])],
  controllers: [VehiclesController],
  providers: [VehiclesService, UtilService],
})
export class VehiclesModule { }
