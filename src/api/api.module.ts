import { Module } from '@nestjs/common';
import { UserModule } from './graphql/user/user.module';
import { ProfileModule } from './graphql/profile/profile.module';
import { UserRoleModule } from './graphql/user-role/user-role.module';
import { ArticleModule } from './graphql/article/article.module';
import { AuthModule } from './graphql/auth/auth.module';
import { ReportsModule } from './rest/reports/reports.module';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    UserRoleModule,
    ArticleModule,
    AuthModule,
    ReportsModule,
  ],
})
export class ApiModule {}
