import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config';

async function bootstrap() {
  const port = configService.getPort();
  const app = await NestFactory.create(AppModule);

  app
    .setGlobalPrefix('/v1/api')
    .useGlobalPipes(new ValidationPipe(configService.getValidationOptions()));

  await app.listen(port, async () =>
    console.log(`Server is running on: ${await app.getUrl()}`),
  );
}
bootstrap();
