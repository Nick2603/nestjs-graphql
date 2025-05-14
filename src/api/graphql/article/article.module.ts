import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleRepository } from './article.repository';
import { ArticleQueryRepository } from './article.query-repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { DataLoaderModule } from 'src/infrastructure/data-loader/data-loader.module';
import { AppCacheModule } from 'src/infrastructure/cache/app-cache.module';
import { AppEventemitterModule } from 'src/infrastructure/eventemitter/app-eventemitter.module';
import { AppElasticsearchModule } from 'src/infrastructure/elasticsearch/app-elasticsearch.module';
import { CaslModule } from 'src/infrastructure/casl/casl.module';

@Module({
  imports: [
    PrismaModule,
    DataLoaderModule,
    AppCacheModule,
    AppEventemitterModule,
    AppElasticsearchModule,
    CaslModule,
  ],
  providers: [
    ArticleResolver,
    ArticleService,
    ArticleQueryRepository,
    ArticleRepository,
  ],
})
export class ArticleModule {}
