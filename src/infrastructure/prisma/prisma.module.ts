import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppCacheModule } from '../cache/app-cache.module';
import { AppElasticsearchModule } from '../elasticsearch/app-elasticsearch.module';

@Module({
  imports: [AppCacheModule, AppElasticsearchModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
