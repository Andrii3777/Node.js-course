import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'user1@gmail.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678' })
    @MinLength(8, { message: 'Password must contain at least 8 characters' })
    @IsNotEmpty()
    @IsString()
    pass: string;
}