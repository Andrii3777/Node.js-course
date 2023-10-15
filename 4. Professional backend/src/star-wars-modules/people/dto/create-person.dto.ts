import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
    @ApiProperty({ example: 'Luke Skywalker' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '172' })
    @IsNotEmpty()
    @IsString()
    height: string;

    @ApiProperty({ example: '77' })
    @IsNotEmpty()
    @IsString()
    mass: string;

    @ApiProperty({ example: 'blond' })
    @IsNotEmpty()
    @IsString()
    hair_color: string;

    @ApiProperty({ example: 'fair' })
    @IsNotEmpty()
    @IsString()
    skin_color: string;

    @ApiProperty({ example: 'blue' })
    @IsNotEmpty()
    @IsString()
    eye_color: string;

    @ApiProperty({ example: '19BBY' })
    @IsNotEmpty()
    @IsString()
    birth_year: string;

    @ApiProperty({ example: 'male' })
    @IsNotEmpty()
    @IsString()
    gender: string;

    @ApiProperty({ example: 'https://swapi.dev/api/people/1/' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsInt()
    homeworldId: number;

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    filmsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    speciesIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    vehiclesIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    starshipsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    imagesIds: number[];
}
