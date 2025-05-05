import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtSetUp } from './jwt.set-up';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModule } from 'src/infrastructure/app-config/app-config.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtSetUp),
    UserModule,
    PassportModule,
    AppConfigModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
