import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import setupSwagger from './utils/setup-swagger.util';

const server: Express = express();
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
export default server;
