import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/users/dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/users/dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        await this.usersService.create(registerDto);
        const user = await this.usersService.findOne(registerDto.email)

        const payload = { sub: user.id, email: user.email, roles: user.roles };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(signInDto: SignInDto) {
        const { email, pass } = signInDto;
        const user = await this.usersService.findOne(email);

        if (!user || !(await bcrypt.compare(pass, user.pass))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { sub: user.id, email: user.email, roles: user.roles };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}