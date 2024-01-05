import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Vehicle } from './entities/vehicle.entity';
import { ApiPaginatedResponse } from '../pagination';

@ApiTags('Vehicles')
@ApiBearerAuth()
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a vehicle' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 201, description: 'Vehicle created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiPaginatedResponse(Vehicle)
  @ApiOperation({ summary: 'Get a list of all vehicles with pagination' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [Vehicle] })
  async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.vehiclesService.getPage({ page, limit });
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get vehicle information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: Vehicle })
  @ApiResponse({ status: 404, description: 'Vehilce not found' })
  async findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update vehicle information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Vehicle updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Vehicle deleted successfully' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  async remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}