import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarWarsModule } from './star-wars-modules/star-wars.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [StarWarsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule { }
