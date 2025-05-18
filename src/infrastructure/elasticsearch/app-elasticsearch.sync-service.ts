import { ELASTICSEARCH_INDEXES } from './elasticsearch.indexes';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppElasticsearchService } from './app-elasticsearch.service';

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
}
