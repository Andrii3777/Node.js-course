import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception-filter';
import { TransformInterceptor } from './common/interseptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Starwars example')
    .setDescription('The starwars API description')
    .setVersion('1.0')
    .addTag('Starwars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter(app.get(Logger)))
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new TransformInterceptor());

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
