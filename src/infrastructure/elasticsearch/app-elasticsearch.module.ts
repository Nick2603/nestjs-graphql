import { Module } from '@nestjs/common';
import { AppElasticsearchService } from './app-elasticsearch.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { appElasticsearchSetUp } from './app-elasticsearch.set-up';
import { AppElasticsearchSyncService } from './app-elasticsearch.sync-service';

@Module({
  imports: [ElasticsearchModule.registerAsync(appElasticsearchSetUp)],
  providers: [AppElasticsearchService, AppElasticsearchSyncService],
  exports: [AppElasticsearchService],
})
export class AppElasticsearchModule {}
