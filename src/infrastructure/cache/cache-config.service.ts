import { Injectable } from '@nestjs/common';
import type {
  CacheModuleOptions,
  CacheOptionsFactory,
} from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}
  createCacheOptions(): CacheModuleOptions {
    return {
      stores: [createKeyv(this.appConfigService.redisUrl)],
    };
  }
}
