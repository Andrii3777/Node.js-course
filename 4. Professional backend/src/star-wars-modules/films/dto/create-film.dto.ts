import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFilmDto {
    @ApiProperty({ example: 'The Phantom Menace' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    @IsString()
    episode_id: string;

    @ApiProperty({ example: 'Turmoil has engulfed the Galactic Republic...' })
    @IsNotEmpty()
    @IsString()
    opening_crawl: string;

    @ApiProperty({ example: 'George Lucas' })
    @IsNotEmpty()
    @IsString()
    director: string;

    @ApiProperty({ example: 'Rick McCallum' })
    @IsNotEmpty()
    @IsString()
    producer: string;

    @ApiProperty({ example: '1999-05-19' })
    @IsNotEmpty()
    @IsString()
    release_date: string;

    @ApiProperty({ example: 'https://swapi.dev/api/films/1/' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    charactersIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    planetsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    starshipsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    vehiclesIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    speciesIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    imagesIds: number[];
}
