import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as DataLoader from 'dataloader';
import type { Article } from 'prisma/generated/prisma';

@Injectable({ scope: Scope.REQUEST })
export class ArticleDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  createLoader() {
    return new DataLoader<string, Article | null>(
      async (articleIds: readonly string[]) => {
        const articles = await this.prisma.article.findMany({
          where: {
            id: { in: articleIds as string[] },
          },
        });

        const articleMap = new Map(
          articles.map((article) => [article.id, article]),
        );
        return articleIds.map((id) => articleMap.get(id) || null);
      },
    );
  }
}
