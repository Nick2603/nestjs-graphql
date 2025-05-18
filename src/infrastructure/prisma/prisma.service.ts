import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/prisma';
import { AppCacheService } from '../cache/app-cache.service';
import { getCacheExtension, getElasticsearchExtension } from './extensions';
import { AppElasticsearchService } from '../elasticsearch/app-elasticsearch.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly appCacheService: AppCacheService,
    private readonly appElasticsearchService: AppElasticsearchService,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  withCacheExtension() {
    return this.$extends(getCacheExtension(this.appCacheService));
  }

  withESExtension() {
    return this.$extends(
      getElasticsearchExtension(this.appElasticsearchService),
    );
  }
}
