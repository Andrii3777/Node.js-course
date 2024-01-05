import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSpeciesDto {
    @ApiProperty({ example: 'Human' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'mammal' })
    @IsNotEmpty()
    @IsString()
    classification: string;

    @ApiProperty({ example: 'sentient' })
    @IsNotEmpty()
    @IsString()
    designation: string;

    @ApiProperty({ example: '180' })
    @IsNotEmpty()
    @IsString()
    average_height: string;

    @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
    @IsNotEmpty()
    @IsString()
    skin_colors: string;

    @ApiProperty({ example: 'blonde, brown, black, red' })
    @IsNotEmpty()
    @IsString()
    hair_colors: string;

    @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
    @IsNotEmpty()
    @IsString()
    eye_colors: string;

    @ApiProperty({ example: '120' })
    @IsNotEmpty()
    @IsString()
    average_lifespan: string;

    @ApiProperty({ example: 'Galactic Basic' })
    @IsNotEmpty()
    @IsString()
    language: string;

    @ApiProperty({ example: 'https://swapi.dev/api/species/1/' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    peopleIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    filmsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    imagesIds: number[];
}
