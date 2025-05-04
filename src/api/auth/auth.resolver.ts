import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { Auth } from './models/auth.model';
import type { GraphQLContext } from 'src/infrastructure/graphql/interfaces';
import { Public } from './decorators/public.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  async register(
    @Context() { res }: GraphQLContext,
    @Args('data') data: AuthInput,
  ) {
    return await this.authService.register(res, data);
  }

  @Public()
  @Mutation(() => Auth)
  async login(
    @Context() { res }: GraphQLContext,
    @Args('data') data: AuthInput,
  ) {
    return await this.authService.login(res, data);
  }

  @Mutation(() => Auth)
  async refresh(@Context() { req, res }: GraphQLContext) {
    return await this.authService.refresh(req, res);
  }

  @Mutation(() => Boolean)
  logout(@Context() { res }: GraphQLContext) {
    return this.authService.logout(res);
  }
}
