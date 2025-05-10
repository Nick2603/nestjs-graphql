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
import { AppCacheService } from 'src/infrastructure/cache/app-cache.service';
import { CACHE_KEYS, getCachedKeyById } from 'src/infrastructure/casl';

@Injectable()
export class ArticleService {
  private readonly cacheTtl: number = 60_000;

  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly articleQueryRepository: ArticleQueryRepository,
    private readonly appCacheService: AppCacheService,
  ) {}

  async getArticlesCached(): Promise<Article[]> {
    const cachedArticles = await this.appCacheService.get<Article[]>(
      CACHE_KEYS.ARTICLES,
    );

    if (cachedArticles) return cachedArticles;

    const articles = await this.articleQueryRepository.getArticles();

    await this.appCacheService.set(
      CACHE_KEYS.ARTICLES,
      articles,
      this.cacheTtl,
    );

    return articles;
  }

  async getArticle(id: string): Promise<Article> {
    return await this.articleQueryRepository.getArticle(id);
  }

  async getArticleCached(id: string): Promise<Article> {
    const cacheKeyById = getCachedKeyById(id, CACHE_KEYS.ARTICLES);

    const cachedArticle = await this.appCacheService.get<Article>(cacheKeyById);

    if (cachedArticle) return cachedArticle;

    const article = await this.articleQueryRepository.getArticle(id);

    await this.appCacheService.set(cacheKeyById, article, this.cacheTtl);

    return article;
  }

  async createArticle(
    userId: string,
    data: CreateArticleInput,
    user: UserWithRoles,
  ): Promise<Article> {
    canCreateArticle(user);

    return await this.articleRepository.createArticle(userId, data);
  }

  async updateArticle(
    id: string,
    data: UpdateArticleInput,
    user: UserWithRoles,
  ): Promise<Article> {
    if (!id) throw new BadRequestException('id must be specified');

    const article = await this.getArticle(id);

    canUpdateArticle(user, article);

    return await this.articleRepository.updateArticle(article.id, data);
  }

  async deleteArticle(id: string, user: UserWithRoles): Promise<Article> {
    const article = await this.getArticle(id);

    canDeleteArticle(user, article);

    return await this.articleRepository.deleteArticleWithCleanup(id);
  }
}
