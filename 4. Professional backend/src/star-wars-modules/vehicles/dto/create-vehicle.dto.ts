import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVehicleDto {
    @ApiProperty({ example: 'Sand Crawler' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'Digger Crawler' })
    @IsNotEmpty()
    @IsString()
    model: string;

    @ApiProperty({ example: 'Corellia Mining Corporation' })
    @IsNotEmpty()
    @IsString()
    manufacturer: string;

    @ApiProperty({ example: '150000' })
    @IsNotEmpty()
    @IsString()
    cost_in_credits: string;

    @ApiProperty({ example: '36.8' })
    @IsNotEmpty()
    @IsString()
    length: string;

    @ApiProperty({ example: '30' })
    @IsNotEmpty()
    @IsString()
    max_atmosphering_speed: string;

    @ApiProperty({ example: '46' })
    @IsNotEmpty()
    @IsString()
    crew: string;

    @ApiProperty({ example: '30' })
    @IsNotEmpty()
    @IsString()
    passengers: string;

    @ApiProperty({ example: '50000' })
    @IsNotEmpty()
    @IsString()
    cargo_capacity: string;

    @ApiProperty({ example: '2 months' })
    @IsNotEmpty()
    @IsString()
    consumables: string;

    @ApiProperty({ example: 'wheeled' })
    @IsNotEmpty()
    @IsString()
    vehicle_class: string;

    @ApiProperty({ example: 'https://swapi.dev/api/vehicles/1/' })
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({ example: 1 })
    @IsOptional()
    @IsInt({ each: true })
    pilotsIds: number[]; //Person

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    filmsIds: number[];

    @ApiProperty({ example: [1, 2, 3] })
    @IsOptional()
    @IsInt({ each: true })
    imagesIds: number[];
}
