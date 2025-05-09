import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { cacheConfigSetUp } from './cache-config.set-up';
import { AppCacheService } from './app-cache.service';

@Module({
  imports: [CacheModule.registerAsync(cacheConfigSetUp)],
  providers: [AppCacheService],
  exports: [AppCacheService],
})
export class AppCacheModule {}
