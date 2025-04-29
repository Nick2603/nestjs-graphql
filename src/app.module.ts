import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [InfrastructureModule, ApiModule],
})
export class AppModule {}
