import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.APP_HOST ?? 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Skeleton API')
    .setDescription(
      "API helps to load data from external API's and build aggregated result",
    )
    .setVersion('1.0')
    .addServer(String(port))
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, documentFactory);

  await app.listen(port);
}
bootstrap();
