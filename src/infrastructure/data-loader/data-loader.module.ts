import { Module } from '@nestjs/common';
import { ProfileDataLoader } from './profile.data-loader';
import { PrismaModule } from '../prisma/prisma.module';
import { UserDataLoader } from './user.data-loader';
import { UserRoleDataLoader } from './user-role.data-loader';

@Module({
  imports: [PrismaModule],
  providers: [ProfileDataLoader, UserDataLoader, UserRoleDataLoader],
  exports: [ProfileDataLoader, UserDataLoader, UserRoleDataLoader],
})
export class DataLoaderModule {}
