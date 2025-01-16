import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // Corrected import
import {
  HttpStatus,
  RequestMethod,
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
  });

  const configService = app.get(ConfigService<AllConfigType>);
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: [
        { method: RequestMethod.GET, path: '/' },
        { method: RequestMethod.GET, path: 'health' },
      ],
    },
  );

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

  await app.listen(3000);
}

bootstrap();
export { server };
