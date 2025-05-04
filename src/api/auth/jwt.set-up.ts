import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AppConfigModule } from 'src/infrastructure/app-config/app-config.module';
import { JwtConfigService } from './jwt-config.service';
import { AppConfigService } from 'src/infrastructure/app-config/app-config.service';

export const jwtSetUp: JwtModuleAsyncOptions = {
  imports: [AppConfigModule],
  useClass: JwtConfigService,
  inject: [AppConfigService],
};
