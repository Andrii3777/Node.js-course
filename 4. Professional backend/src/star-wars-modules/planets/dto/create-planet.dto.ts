import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlanetDto {
    @ApiProperty({ example: 'Tatooine' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '23' })
    @IsNotEmpty()
    @IsString()
    rotation_period: string;

    @ApiProperty({ example: '304' })
    @IsNotEmpty()
    @IsString()
    orbital_period: string;

    @ApiProperty({ example: '10465' })
    @IsNotEmpty()
    @IsString()
    diameter: string;

    @ApiProperty({ example: 'arid' })
    @IsNotEmpty()
    @IsString()
    climate: string;

    @ApiProperty({ example: '1 standard' })
    @IsNotEmpty()
    @IsString()
    gravity: string;

    @ApiProperty({ example: 'desert' })
    @IsNotEmpty()
    @IsString()
    terrain: string;

    @ApiProperty({ example: '1' })
    @IsNotEmpty()
    @IsString()
    surface_water: string;

    @ApiProperty({ example: '200000' })
    @IsNotEmpty()
    @IsString()
    population: string;

    @ApiProperty({ example: 'https://swapi.dev/api/planets/1/' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    residentsIds: number[]; //Person

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    filmsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    imagesIds: number[];
}
