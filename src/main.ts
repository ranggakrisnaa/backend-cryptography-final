import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { VersioningType } from '@nestjs/common';
import setupSwagger from './utils/setup-swagger.util';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(process.env.PORT ?? 3000);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  setupSwagger(app);
  return app;
}
export default bootstrap().then((app) => app.getHttpServer());
