import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppCacheModule } from '../cache/app-cache.module';

@Module({
  imports: [AppCacheModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
