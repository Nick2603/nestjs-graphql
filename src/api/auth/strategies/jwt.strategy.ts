import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AppConfigService } from 'src/infrastructure/app-config/app-config.service';
import { JWT_ALGORITHM } from '../constants';
import type { JwtPayload } from '../interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import type { UserWithRoles } from 'src/api/user/interfaces/user-with-roles.interface';

export const JWT_STRATEGY_NAME = 'jwtStrategy' as const;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
  constructor(
    private readonly authService: AuthService,
    private readonly appConfigService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwtSecret,
      algorithms: JWT_ALGORITHM ? [JWT_ALGORITHM] : undefined,
    });
  }

  async validate({ id }: JwtPayload): Promise<UserWithRoles> {
    return await this.authService.validate(id);
  }
}
