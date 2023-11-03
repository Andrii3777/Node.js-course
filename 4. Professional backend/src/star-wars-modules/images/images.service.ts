import { Injectable, BadRequestException, NotFoundException, HttpException } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DeleteBucketCommandOutput, DeleteObjectCommand, PutBucketAclCommandOutput, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImagesService {
  private readonly s3 = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    }
  });

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly configService: ConfigService,
  ) { }

  async create(files: Express.Multer.File[]) {
    if (!files.length) throw new BadRequestException('No files uploaded');
    const images = [];

    for (const file of files) {
      await this.uploadFile(file.originalname, file.buffer);

      const image = this.imageRepository.create({
        filename: file.originalname,
        link: `https://${this.configService.getOrThrow('AWS_S3_BUCKET')}.s3.amazonaws.com/${file.originalname}`
      });

      images.push(await this.imageRepository.save(image));
    }

    return images;
  }

  async findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: number) {
    const image = await this.imageRepository.findOneBy({ id });

    if (!image) throw new NotFoundException(`Image with ID ${id} not found`);

    return image;
  }

  async update(id: number, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    const image = await this.findOne(id);

    await this.remove(id);
    await this.uploadFile(file.originalname, file.buffer);

    image.filename = file.originalname;
    image.link = `https://${this.configService.getOrThrow('AWS_S3_BUCKET')}.s3.amazonaws.com/${file.originalname}`;

    return await this.imageRepository.save(image);
  }

  async remove(id: number) {
    const image = await this.findOne(id);

    const response: DeleteBucketCommandOutput = await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: image.filename,
      })
    );

    if (response.$metadata.httpStatusCode !== 204) {
      throw new HttpException('Image not deleted in s3!', response.$metadata.httpStatusCode);
    }

    return this.imageRepository.delete(id);
  }

  async uploadFile(key: string, file: Buffer) {
    const response: PutBucketAclCommandOutput = await this.s3.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: key,
        Body: file,
      })
    );

    if (response.$metadata.httpStatusCode !== 200) {
      throw new HttpException('Image not saved in s3!', response.$metadata.httpStatusCode);
    }
  }
}
