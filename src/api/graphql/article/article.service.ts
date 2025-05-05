import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleQueryRepository } from './article.query-repository';
import type { CreateArticleInput } from './dto/create-article.input';
import type { Article } from 'prisma/generated/prisma';
import type { UpdateArticleInput } from './dto/update-article.input';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly articleQueryRepository: ArticleQueryRepository,
  ) {}

  async getArticles(): Promise<Article[]> {
    return await this.articleQueryRepository.getArticles();
  }

  async getArticle(id: string): Promise<Article> {
    return await this.articleQueryRepository.getArticle(id);
  }

  async createArticle(
    userId: string,
    data: CreateArticleInput,
  ): Promise<Article> {
    return this.articleRepository.createArticle(userId, data);
  }

  async updateArticle(id: string, data: UpdateArticleInput): Promise<Article> {
    if (!id) throw new BadRequestException('id must be specified');

    const { id: articleId } = await this.getArticle(id);

    return this.articleRepository.updateArticle(articleId, data);
  }

  async deleteArticle(id: string): Promise<Article> {
    return await this.articleRepository.deleteArticleWithCleanup(id);
  }
}
