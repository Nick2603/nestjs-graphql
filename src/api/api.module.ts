import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { UserRoleModule } from './user-role/user-role.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    UserRoleModule,
    ArticleModule,
    AuthModule,
  ],
})
export class ApiModule {}
