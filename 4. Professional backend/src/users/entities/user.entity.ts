import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'user1@gmail.com' })
    email: string;

    @Column()
    @ApiProperty({ example: 'User' })
    name: string;

    @Column()
    @ApiProperty({ example: '12345678' })
    pass: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: [Role.Admin]
    })
    @ApiProperty({ example: 'user' })
    roles: Role[];
}