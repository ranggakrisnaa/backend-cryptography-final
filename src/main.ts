import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express'; // Corrected import
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import setupSwagger from './utils/setup-swagger.util';
import { ValidationError } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';

let server: express.Application; // Define server in global scope
async function bootstrap() {
  server = express(); // Define server once here
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server)); // Use the 'server'

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );
  setupSwagger(app);

  app.get(ConfigService<AllConfigType>);

  await app.listen(3000);
}

bootstrap();
export { server };
