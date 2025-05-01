import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [UserModule, ProfileModule, UserRoleModule],
})
export class ApiModule {}
