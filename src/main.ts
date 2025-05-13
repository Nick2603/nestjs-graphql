import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './infrastructure/app-config/app-config.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { JwtGuard } from './api/graphql/auth/guards/jwt.guard';
import { RolesGuard } from './api/graphql/auth/guards/roles.guard';
import { PoliciesGuard } from './infrastructure/casl/guards/policies.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfigService = app.get(AppConfigService);

  app.enableCors({
    origin: appConfigService.corsOrigin,
    credentials: true,
  });

  app.use(cookieParser());

  const reflector = app.get(Reflector);

  app.useGlobalGuards(
    new JwtGuard(reflector),
    new RolesGuard(reflector),
    new PoliciesGuard(reflector),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(appConfigService.port);
}

void bootstrap();
