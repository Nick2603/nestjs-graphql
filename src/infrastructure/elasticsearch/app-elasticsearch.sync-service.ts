import { Injectable } from '@nestjs/common';
import { AppElasticsearchService } from './app-elasticsearch.service';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ArticleCreated,
  articleCreatedEventKey,
  ArticleDeleted,
  articleDeletedEventKey,
  ArticleUpdated,
  articleUpdatedEventKey,
} from '../eventemitter/events';

@Injectable()
export class AppElasticsearchSyncService {
  private readonly index: string = 'article';

  constructor(
    private readonly appElasticsearchService: AppElasticsearchService,
  ) {}

  @OnEvent(articleCreatedEventKey, { async: true })
  async handleArticleCreatedEvent({
    id,
    ...rest
  }: ArticleCreated): Promise<void> {
    await this.appElasticsearchService.createDocument(this.index, id, rest);
  }

  @OnEvent(articleUpdatedEventKey, { async: true })
  async handleArticleUpdatedEvent(payload: ArticleUpdated): Promise<void> {
    console.log(payload);
  }

  @OnEvent(articleDeletedEventKey, { async: true })
  async handleArticleDeletedEvent(payload: ArticleDeleted): Promise<void> {
    console.log(payload);
  }
}
