import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Species } from './entities/species.entity';
import { ApiPaginatedResponse } from '../pagination';

@ApiTags('Species')
@ApiBearerAuth()
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) { }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a species' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 201, description: 'Species created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiPaginatedResponse(Species)
  @ApiOperation({ summary: 'Get a list of all species with pagination' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [Species] })
  async getPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.speciesService.getPage({ page, limit });
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get species information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: Species })
  @ApiResponse({ status: 404, description: 'Species not found' })
  async findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update species information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Species updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 404, description: 'Species not found' })
  async update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a species by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Species deleted successfully' })
  @ApiResponse({ status: 404, description: 'Species not found' })
  async remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}
