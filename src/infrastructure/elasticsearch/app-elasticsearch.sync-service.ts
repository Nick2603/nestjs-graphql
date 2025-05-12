import { ELASTICSEARCH_INDEXES } from './elasticsearch.indexes';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppElasticsearchService } from './app-elasticsearch.service';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ArticleCreated,
  ArticleDeleted,
  ArticleUpdated,
  EVENTS_KEYS,
} from '../eventemitter/events';

@Injectable()
export class AppElasticsearchSyncService implements OnModuleInit {
  constructor(
    private readonly appElasticsearchService: AppElasticsearchService,
  ) {}

  async onModuleInit(): Promise<void> {
    for (const index of Object.values(ELASTICSEARCH_INDEXES)) {
      const exists =
        await this.appElasticsearchService.checkIndicesExists(index);

      if (!exists) {
        await this.appElasticsearchService.createIndices(index);

        console.log(`Index "${index}" created`);
      }
    }
  }

  @OnEvent(EVENTS_KEYS.ARTICLE_CREATED, { async: true })
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

  @OnEvent(EVENTS_KEYS.ARTICLE_UPDATED, { async: true })
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

  @OnEvent(EVENTS_KEYS.ARTICLE_DELETED, { async: true })
  async handleArticleDeletedEvent({ id }: ArticleDeleted): Promise<void> {
    await this.appElasticsearchService.deleteDocument(
      ELASTICSEARCH_INDEXES.ARTICLE,
      id,
    );
  }
}
