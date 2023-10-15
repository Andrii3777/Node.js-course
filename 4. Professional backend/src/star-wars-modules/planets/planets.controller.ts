import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Planet } from './entities/planet.entity';

@ApiTags('Planets')
@ApiBearerAuth()
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a planet' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 201, description: 'Planet created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get a list of all planets' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [Planet] })
  async findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get planet information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: Planet })
  @ApiResponse({ status: 404, description: 'Planet not found' })
  async findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update planet information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Planet updated successfully' })
  @ApiResponse({ status: 404, description: 'Planet not found' })
  async update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a planet by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Planet deleted successfully' })
  @ApiResponse({ status: 404, description: 'Planet not found' })
  async remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }
}
