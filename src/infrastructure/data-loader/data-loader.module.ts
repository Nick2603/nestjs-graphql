import { Module } from '@nestjs/common';
import { ProfileDataLoader } from './profile.data-loader';
import { PrismaModule } from '../prisma/prisma.module';
import { UserDataLoader } from './user.data-loader';

@Module({
  imports: [PrismaModule],
  providers: [ProfileDataLoader, UserDataLoader],
  exports: [ProfileDataLoader, UserDataLoader],
})
export class DataLoaderModule {}
