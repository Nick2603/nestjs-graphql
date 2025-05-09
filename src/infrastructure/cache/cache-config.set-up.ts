import type { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { CacheConfigService } from './cache-config.service';

export const cacheConfigSetUp: CacheModuleAsyncOptions = {
  imports: [AppConfigModule],
  useClass: CacheConfigService,
  inject: [AppConfigService],
};
