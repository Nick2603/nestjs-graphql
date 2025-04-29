import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './infrastructure/app-config/app-config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfigService = app.get(AppConfigService);

  app.enableCors({
    origin: appConfigService.corsOrigin,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfigService.port);
}

void bootstrap();
