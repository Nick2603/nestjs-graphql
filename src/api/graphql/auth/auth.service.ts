import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthInput } from './dto/auth.input';
import type { JwtPayload } from './interfaces/jwt.interface';
import type {
  AccessToken,
  AuthTokens,
} from './interfaces/auth-tokens.interface';
import { UserService } from '../user/user.service';
import { comparePassword } from 'src/common/utils/hash';
import type { Request, Response } from 'express';
import type { UserWithRoles } from '../user/interfaces/user-with-roles.interface';

@Injectable()
export class AuthService {
  private readonly refreshToken = 'refreshToken';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(res: Response, data: AuthInput): Promise<AccessToken> {
    const user = await this.userService.createUser(data);

    return this.auth(res, user.id);
  }

  async login(res: Response, data: AuthInput): Promise<AccessToken> {
    const user = await this.userService.getUserByEmail(data.email);

    if (!(await comparePassword(data.password, user.password)))
      throw new NotFoundException('User not found');

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response): Promise<AccessToken> {
    const refreshToken = req.cookies[this.refreshToken];

    if (!refreshToken)
      throw new UnauthorizedException('RefreshToken not found');

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (!payload) throw new UnauthorizedException('Authorization failed');

    const user = await this.userService.getUser(payload.id);

    return this.auth(res, user.id);
  }

  logout(res: Response): boolean {
    this.setCookie(res, this.refreshToken, new Date(0));

    return true;
  }

  async validate(id: string): Promise<UserWithRoles> {
    return await this.userService.getUserWithRoles(id);
  }

  private auth(res: Response, id: string): AccessToken {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 5),
    );

    return { accessToken };
  }

  private generateTokens(id: string): AuthTokens {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '5h',
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date): void {
    res.cookie(this.refreshToken, value, {
      httpOnly: true,
      expires,
      sameSite: 'none',
      secure: true,
      // domain: 'your_domain',
    });
  }
}
