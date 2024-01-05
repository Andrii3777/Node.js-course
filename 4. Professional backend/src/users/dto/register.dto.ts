import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({ example: 'user1@gmail.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'User' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '12345678' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must contain at least 8 characters' })
    pass: string;
}