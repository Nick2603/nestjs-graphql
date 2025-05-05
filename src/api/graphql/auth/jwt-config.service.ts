import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { AppConfigService } from 'src/infrastructure/app-config/app-config.service';
import { JWT_ALGORITHM } from './constants';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.appConfigService.jwtSecret,
      signOptions: {
        algorithm: JWT_ALGORITHM,
      },
      verifyOptions: {
        algorithms: JWT_ALGORITHM ? [JWT_ALGORITHM] : undefined,
        ignoreExpiration: false,
      },
    };
  }
}
