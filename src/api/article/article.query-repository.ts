import { Injectable, NotFoundException } from '@nestjs/common';
import type { Article } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ArticleQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getArticles(): Promise<Article[]> {
    return await this.prisma.article.findMany();
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
