import { ELASTICSEARCH_INDEXES } from './elasticsearch.indexes';
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
  constructor(
    private readonly appElasticsearchService: AppElasticsearchService,
  ) {}

  @OnEvent(articleCreatedEventKey, { async: true })
  async handleArticleCreatedEvent({
    id,
    text,
    genres,
  }: ArticleCreated): Promise<void> {
    await this.appElasticsearchService.createDocument(
      ELASTICSEARCH_INDEXES.ARTICLE,
      id,
      {
        text,
        genres,
      },
    );
  }

  @OnEvent(articleUpdatedEventKey, { async: true })
  async handleArticleUpdatedEvent({
    id,
    text,
    genres,
  }: ArticleUpdated): Promise<void> {
    await this.appElasticsearchService.updateDocument(
      ELASTICSEARCH_INDEXES.ARTICLE,
      id,
      {
        text,
        genres,
      },
    );
  }

  @OnEvent(articleDeletedEventKey, { async: true })
  async handleArticleDeletedEvent({ id }: ArticleDeleted): Promise<void> {
    await this.appElasticsearchService.deleteDocument(
      ELASTICSEARCH_INDEXES.ARTICLE,
      id,
    );
  }
}
