import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Starship } from './entities/starship.entity';

@Roles(Role.Admin)
@ApiTags('Starships')
@ApiBearerAuth()
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) { }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a starship' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 201, description: 'Starship created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get a list of all starships' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [Starship] })
  async findAll() {
    return this.starshipsService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get starship information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: Starship })
  @ApiResponse({ status: 404, description: 'Starship not found' })
  async findOne(@Param('id') id: string) {
    return this.starshipsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update starship information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Starship updated successfully' })
  @ApiResponse({ status: 404, description: 'Starship not found' })
  async update(@Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a starship by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Starship deleted successfully' })
  @ApiResponse({ status: 404, description: 'Starship not found' })
  async remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}
