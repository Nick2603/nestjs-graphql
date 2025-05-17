import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/prisma';
import { AppCacheService } from '../cache/app-cache.service';
import { getCacheExtension } from './extensions';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly appCacheService: AppCacheService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  withExtensions() {
    return this.$extends({
      ...getCacheExtension(this.appCacheService),
    });
  }
}
