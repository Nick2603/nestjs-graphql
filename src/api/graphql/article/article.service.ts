import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { ArticleQueryRepository } from './article.query-repository';
import type { CreateArticleInput } from './dto/create-article.input';
import type { Article } from 'prisma/generated/prisma';
import type { UpdateArticleInput } from './dto/update-article.input';
import type { UserWithRoles } from '../user/interfaces/user-with-roles.interface';
import { canUpdateArticle, canDeleteArticle } from 'src/infrastructure/casl';
import { AppEventemitterService } from 'src/infrastructure/eventemitter/app-eventemitter.service';
import {
  ArticleCreated,
  ArticleUpdated,
  ArticleDeleted,
  EVENTS_KEYS,
} from 'src/infrastructure/eventemitter/events';
import { AppElasticsearchService } from 'src/infrastructure/elasticsearch/app-elasticsearch.service';
import { ELASTICSEARCH_INDEXES } from 'src/infrastructure/elasticsearch/elasticsearch.indexes';
import { CaslService } from 'src/infrastructure/casl/casl.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly articleQueryRepository: ArticleQueryRepository,
    private readonly appEventemitterService: AppEventemitterService,
    private readonly appElasticsearchService: AppElasticsearchService,
    private readonly caslService: CaslService,
  ) {}

  async getArticlesCached(textContent?: string): Promise<Article[]> {
    if (!textContent)
      return await this.articleQueryRepository.getArticlesWithCache();

    const articles = await this.appElasticsearchService.getDocuments<
      Pick<Article, 'genres' | 'text'>
    >(ELASTICSEARCH_INDEXES.ARTICLE, {
      text: textContent,
    });

    const ids = articles.map((article) => article._id);

    return ids.length
      ? await this.articleQueryRepository.getArticlesWithCache({ ids })
      : [];
  }

  async getArticle(id: string): Promise<Article> {
    return await this.articleQueryRepository.getArticle(id);
  }

  async createArticle(
    userId: string,
    data: CreateArticleInput,
  ): Promise<Article> {
    const article = await this.articleRepository.createArticle(userId, data);

    await this.appEventemitterService.emitEvent(
      EVENTS_KEYS.ARTICLE_CREATED,
      new ArticleCreated(article),
    );

    return article;
  }

  async updateArticle(
    id: string,
    data: UpdateArticleInput,
    user: UserWithRoles,
  ): Promise<Article> {
    if (!id) throw new BadRequestException('id must be specified');

    const article = await this.getArticle(id);

    canUpdateArticle(user, article, this.caslService);

    const updatedArticle = await this.articleRepository.updateArticle(
      article.id,
      data,
    );

    await this.appEventemitterService.emitEvent(
      EVENTS_KEYS.ARTICLE_UPDATED,
      new ArticleUpdated(updatedArticle),
    );

    return updatedArticle;
  }

  async deleteArticle(id: string, user: UserWithRoles): Promise<Article> {
    const article = await this.getArticle(id);

    canDeleteArticle(user, article, this.caslService);

    const deletedArticle =
      await this.articleRepository.deleteArticleWithCleanup(id);

    await this.appEventemitterService.emitEvent(
      EVENTS_KEYS.ARTICLE_DELETED,
      new ArticleDeleted(deletedArticle.id),
    );

    return deletedArticle;
  }
}
