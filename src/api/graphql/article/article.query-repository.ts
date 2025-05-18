import { Injectable, NotFoundException } from '@nestjs/common';
import type { Article } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

interface articleSearchParams {
  ids?: string[];
}

@Injectable()
export class ArticleQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getArticlesWithCache(params?: articleSearchParams): Promise<Article[]> {
    const where = { ...(params?.ids?.length && { id: { in: params.ids } }) };

    return await this.prisma.withCacheExtension().article.findManyWithCache({
      ...where,
    });
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getArticle(id: string): Promise<Article | never> {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) throw new NotFoundException('Article not found');

    return article;
  }
}
