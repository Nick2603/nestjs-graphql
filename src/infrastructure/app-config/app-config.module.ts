import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

import { appConfigSetUp } from './app-config.set-up';

@Module({
  imports: [ConfigModule.forRoot(appConfigSetUp)],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
