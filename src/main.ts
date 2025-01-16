import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { VersioningType } from '@nestjs/common';
import setupSwagger from './utils/setup-swagger.util';

// This function will create a serverless-compatible handler
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  setupSwagger(app);

  // Return the HTTP server to Vercel
  return app;
}

// Export the serverless handler for Vercel
export default async (req, res) => {
  const app = await bootstrap();
  return app.getHttpServer()(req, res); // Delegate the request to NestJS app
};
