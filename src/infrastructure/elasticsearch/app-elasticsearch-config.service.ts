import { AppConfigService } from './../app-config/app-config.service';
import { Injectable } from '@nestjs/common';
import type {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from '@nestjs/elasticsearch';

@Injectable()
export class AppElasticsearchConfigService
  implements ElasticsearchOptionsFactory
{
  constructor(private readonly appConfigService: AppConfigService) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.appConfigService.esUrl,
    };
  }
}
