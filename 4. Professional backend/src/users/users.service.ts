import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(registerDto: RegisterDto) {
        const { email, name, pass } = registerDto;
        if (await this.findOne(email)) {
            throw new ConflictException('User already exists');
        }

        const hashedPass = await bcrypt.hash(pass, 10);
        const user = this.userRepository.create({
            email,
            name,
            pass: hashedPass,
        });

        return await this.userRepository.insert(user);
    }

    async findOne(email: string) {
        return await this.userRepository.findOneBy({ email });
    }
}