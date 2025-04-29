import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { AppConfigService } from '../app-config/app-config.service';
import { PrismaClient } from '../../../prisma/generated/prisma';
import ws from 'ws';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly appConfigService: AppConfigService) {
    neonConfig.webSocketConstructor = ws;

    const adapter = new PrismaNeon({
      connectionString: appConfigService.databaseUrl,
    });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
