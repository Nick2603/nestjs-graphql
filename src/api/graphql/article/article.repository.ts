import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, type Article } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import type { CreateArticleInput } from './dto/create-article.input';
import type { UpdateArticleInput } from './dto/update-article.input';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createArticle(
    userId: string,
    data: CreateArticleInput,
  ): Promise<Article> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    return await this.prisma.withESExtension().$transaction(async (tx) => {
      const article = await tx.article.createWithESSync({
        data: {
          ...data,
          authorId: user.id,
        },
      });

      const updatedArticleIds = [...(user?.articleIds ?? []), article.id];

      await tx.user.update({
        where: { id: user.id },
        data: {
          articleIds: {
            set: updatedArticleIds,
          },
        },
      });

      return article;
    });
  }

  async updateArticle(id: string, data: UpdateArticleInput): Promise<Article> {
    return await this.prisma.withESExtension().article.updateWithESSync({
      where: {
        id,
      },
      data,
    });
  }

  async deleteArticle(id: string): Promise<Article> {
    return await this.prisma.withESExtension().article.deleteWithESSync({
      where: {
        id,
      },
    });
  }

  async deleteArticleWithCleanup(id: string): Promise<Article> {
    return await this.prisma.withESExtension().$transaction(
      async (tx) => {
        const article = await tx.article.findUnique({
          where: { id },
          include: {
            author: true,
          },
        });

        if (!article) {
          throw new NotFoundException('Article not found');
        }

        await tx.user.update({
          where: { id: article.authorId },
          data: {
            articleIds: article.author.articleIds.filter(
              (id) => id !== article.id,
            ),
          },
        });

        return await tx.article.deleteWithESSync({
          where: { id: article.id },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }
}
