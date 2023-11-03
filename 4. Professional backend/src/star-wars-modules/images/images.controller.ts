import { Controller, Get, Post, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { uploadConfig } from "src/common/config/upload.config";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Image } from './entities/image.entity';
import { ApiUploadFiles } from './docs/api-upload-files.decorator';

@ApiTags('Images')
@ApiBearerAuth()
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @Roles(Role.Admin)
  @ApiUploadFiles()
  @UseInterceptors(FilesInterceptor('files', Infinity, uploadConfig))
  @ApiOperation({ summary: 'Upload an image' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request, no files uploaded' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 415, description: 'File does not match the format .jpg/.jpeg/.png/.gif' })
  async create(@UploadedFiles() files: Express.Multer.File[]) {
    return this.imagesService.create(files);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get a list of all pictures' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: [Image] })
  async findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get picture information by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved', type: Image })
  async findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file', uploadConfig),)
  @ApiOperation({ summary: 'Update picture information by ID' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request, no files uploaded' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 404, description: 'Picture not found' })
  @ApiResponse({ status: 415, description: 'File does not match the format .jpg/.jpeg/.png/.gif' })
  async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.imagesService.update(+id, file);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 200, description: 'Film deleted successfully' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
