import { Inject, Injectable } from '@nestjs/common';
import configuration from './configuration';
import type { ConfigType } from '@nestjs/config';
import { NODE_ENV } from './interfaces';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
  ) {}

  get port(): number {
    return this.config.port;
  }

  get databaseUrl(): string {
    return this.config.databaseUrl;
  }

  get isDev(): boolean {
    return this.config.nodeEnv === NODE_ENV.DEVELOPMENT;
  }

  get corsOrigin(): string[] {
    return this.config.corsOrigin.split(',');
  }

  get jwtSecret(): string {
    return this.config.jwtSecret;
  }

  get redisUrl(): string {
    return this.config.redisUrl;
  }
}
