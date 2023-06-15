import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.getPort();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Genesis Beck End API')
    .setDescription('Genesis Beck End API')
    .setVersion('0.0.1')
    .build();

  app
    .setGlobalPrefix('/v1/api')
    .useGlobalPipes(new ValidationPipe(configService.getValidationOptions()));

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, async () =>
    console.log(`Server is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
