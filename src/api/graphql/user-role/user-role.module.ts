import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleResolver } from './user-role.resolver';
import { UserRoleQueryRepository } from './user-role.query-repository';
import { UserRoleRepository } from './user-role.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { DataLoaderModule } from 'src/infrastructure/data-loader/data-loader.module';

@Module({
  imports: [PrismaModule, DataLoaderModule],
  providers: [
    UserRoleResolver,
    UserRoleService,
    UserRoleQueryRepository,
    UserRoleRepository,
  ],
})
export class UserRoleModule {}
