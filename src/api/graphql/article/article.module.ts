import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleRepository } from './article.repository';
import { ArticleQueryRepository } from './article.query-repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { DataLoaderModule } from 'src/infrastructure/data-loader/data-loader.module';

@Module({
  imports: [PrismaModule, DataLoaderModule],
  providers: [
    ArticleResolver,
    ArticleService,
    ArticleQueryRepository,
    ArticleRepository,
  ],
})
export class ArticleModule {}
