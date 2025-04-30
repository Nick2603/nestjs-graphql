import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { UserQueryRepository } from './user.query-repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { DataLoaderModule } from 'src/infrastructure/data-loader/data-loader.module';

@Module({
  imports: [PrismaModule, DataLoaderModule],
  providers: [UserResolver, UserService, UserRepository, UserQueryRepository],
  exports: [UserQueryRepository],
})
export class UserModule {}
