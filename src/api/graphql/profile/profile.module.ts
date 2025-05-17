import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { ProfileQueryRepository } from './profile.query-repository';
import { ProfileRepository } from './profile.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { DataLoaderModule } from 'src/infrastructure/data-loader/data-loader.module';

@Module({
  imports: [PrismaModule, UserModule, DataLoaderModule],
  providers: [
    ProfileResolver,
    ProfileService,
    ProfileRepository,
    ProfileQueryRepository,
  ],
})
export class ProfileModule {}
