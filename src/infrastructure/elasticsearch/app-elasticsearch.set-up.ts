import type { ElasticsearchModuleAsyncOptions } from '@nestjs/elasticsearch';
import { AppElasticsearchConfigService } from './app-elasticsearch-config.service';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';

export const appElasticsearchSetUp: ElasticsearchModuleAsyncOptions = {
  imports: [AppConfigModule],
  useClass: AppElasticsearchConfigService,
  inject: [AppConfigService],
};
