import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleQueryRepository } from './article.query-repository';
import type { CreateArticleInput } from './dto/create-article.input';
import type { Article } from 'prisma/generated/prisma';
import type { UpdateArticleInput } from './dto/update-article.input';
import type { UserWithRoles } from '../user/interfaces/user-with-roles.interface';
import {
  canCreateArticle,
  canDeleteArticle,
  canUpdateArticle,
} from 'src/infrastructure/casl';

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
    user: UserWithRoles,
  ): Promise<Article> {
    canCreateArticle(user);

    return this.articleRepository.createArticle(userId, data);
  }

  async updateArticle(
    id: string,
    data: UpdateArticleInput,
    user: UserWithRoles,
  ): Promise<Article> {
    if (!id) throw new BadRequestException('id must be specified');

    const article = await this.getArticle(id);

    canUpdateArticle(user, article);

    return this.articleRepository.updateArticle(article.id, data);
  }

  async deleteArticle(id: string, user: UserWithRoles): Promise<Article> {
    const article = await this.getArticle(id);

    canDeleteArticle(user, article);

    return await this.articleRepository.deleteArticleWithCleanup(id);
  }
}
