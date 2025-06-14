import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './logger/winston';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const port = process.env.APP_PORT ?? 3000;
  const host = process.env.APP_HOST ?? 'http://localhost:3000';
  const app = await NestFactory.create(AppModule);

  // Set global prefix
  app.setGlobalPrefix('/api')


  // Bind ValidationPipe at the application level,
  // thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(
      new ValidationPipe()
  )

  // Enable CORS
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Skeleton API')
    .setDescription(
      "API helps to load data from external API's and build aggregated result",
    )
    .setVersion('1.0')
    .addServer(host)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, documentFactory);

  await app.listen(port);

  logger.log('info', {
    message: `The server starts listening on ${port} port`,
  });
}
bootstrap();
