import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class AppCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get<T>(cacheKey: string) {
    return await this.cacheManager.get<T>(cacheKey);
  }

  async set<T>(cacheKey: string, value: T, ttl?: number) {
    return await this.cacheManager.set(cacheKey, value, ttl);
  }

  async delete(cacheKey: string) {
    return await this.cacheManager.del(cacheKey);
  }
}
