import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { ImagesModule } from './images/images.module';
import { PeopleModule } from './people/people.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '../auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        FilmsModule,
        PeopleModule,
        PlanetsModule,
        SpeciesModule,
        StarshipsModule,
        VehiclesModule,
        ImagesModule,
    ],
    providers: [
        /* {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        }, */
    ],
})
export class StarWarsModule { }