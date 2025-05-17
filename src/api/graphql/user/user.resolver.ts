import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProfileDataLoader } from 'src/infrastructure/data-loader/profile.data-loader';
import { Profile } from '../profile/models/profile.model';
import { UserRoleDataLoader } from 'src/infrastructure/data-loader/user-role.data-loader';
import { UserRole } from '../user-role/models/user-role.model';
import { ArticleDataLoader } from 'src/infrastructure/data-loader/article.data-loader';
import { Article } from '../article/models/article.model';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import type { UserWithRoles } from './interfaces/user-with-roles.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from 'prisma/generated/prisma';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly profileDataLoader: ProfileDataLoader,
    private readonly userRoleDataLoader: UserRoleDataLoader,
    private readonly articleDataLoader: ArticleDataLoader,
  ) {}

  @Public()
  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsersCached();
  }

  @Public()
  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Query(() => User)
  getMe(@CurrentUser() user: UserWithRoles) {
    return user;
  }

  @Roles(RoleEnum.ADMIN)
  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Roles(RoleEnum.ADMIN)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ) {
    return await this.userService.updateUser(id, data);
  }

  @Roles(RoleEnum.ADMIN)
  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @ResolveField('profile', () => Profile, { nullable: true })
  async user(@Parent() { profileId }: User) {
    return profileId
      ? await this.profileDataLoader.createLoader().load(profileId)
      : null;
  }

  @ResolveField('roles', () => [UserRole], { nullable: 'itemsAndList' })
  async users(@Parent() { roleIds }: User) {
    return roleIds?.length
      ? await this.userRoleDataLoader.createLoader().loadMany(roleIds)
      : [];
  }

  @ResolveField('articles', () => [Article], { nullable: 'itemsAndList' })
  async articles(@Parent() { articleIds }: User) {
    return articleIds?.length
      ? await this.articleDataLoader.createLoader().loadMany(articleIds)
      : [];
  }
}
