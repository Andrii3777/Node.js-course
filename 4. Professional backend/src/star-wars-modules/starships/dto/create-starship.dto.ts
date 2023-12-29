import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStarshipDto {
    @ApiProperty({ example: 'CR90 corvette' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'CR90 corvette' })
    @IsNotEmpty()
    @IsString()
    model: string;

    @ApiProperty({ example: 'Corellian Engineering Corporation' })
    @IsNotEmpty()
    @IsString()
    manufacturer: string;

    @ApiProperty({ example: '3500000' })
    @IsNotEmpty()
    @IsString()
    cost_in_credits: string;

    @ApiProperty({ example: '150' })
    @IsNotEmpty()
    @IsString()
    length: string;

    @ApiProperty({ example: '950' })
    @IsNotEmpty()
    @IsString()
    max_atmosphering_speed: string;

    @ApiProperty({ example: '30-165' })
    @IsNotEmpty()
    @IsString()
    crew: string;

    @ApiProperty({ example: '600' })
    @IsNotEmpty()
    @IsString()
    passengers: string;

    @ApiProperty({ example: '3000000' })
    @IsNotEmpty()
    @IsString()
    cargo_capacity: string;

    @ApiProperty({ example: '1 year' })
    @IsNotEmpty()
    @IsString()
    consumables: string;

    @ApiProperty({ example: '2.0' })
    @IsNotEmpty()
    @IsString()
    hyperdrive_rating: string;

    @ApiProperty({ example: '60' })
    @IsNotEmpty()
    @IsString()
    MGLT: string;

    @ApiProperty({ example: 'corvette' })
    @IsNotEmpty()
    @IsString()
    starship_class: string;

    @ApiProperty({ example: 'https://swapi.dev/api/starships/1/' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    pilotsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    filmsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    imagesIds: number[];
}
