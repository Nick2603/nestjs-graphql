import { Prisma } from 'prisma/generated/prisma';
import type { AppCacheService } from 'src/infrastructure/cache/app-cache.service';
import { CACHE_TTL } from 'src/infrastructure/cache/constants';

export function getCacheExtension(appCacheService: AppCacheService) {
  return {
    name: 'cache-extension',
    model: {
      $allModels: {
        async findManyWithCache<T, R>(
          this: T,
          where: Prisma.Args<T, 'findMany'>['where'] = {},
        ): Promise<R[]> {
          const context = Prisma.getExtensionContext(this) as any;

          const namePart = context.name;

          const wherePart = JSON.stringify(where);

          const cacheKey = `${namePart}_${wherePart}`;

          const cached = await appCacheService.get<R[]>(cacheKey);

          if (cached) return cached;

          const result = await context.findMany({ where });

          await appCacheService.set(cacheKey, result, CACHE_TTL);

          return result;
        },
      },
    },
  };
}
