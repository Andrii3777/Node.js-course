import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

config();
const configService = new ConfigService();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: configService.getOrThrow('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}