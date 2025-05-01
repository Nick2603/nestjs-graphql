import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserRoleService } from './user-role.service';
import { UserRole } from './models/user-role.model';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UserDataLoader } from 'src/infrastructure/data-loader/user.data-loader';
import { User } from '../user/models/user.model';

@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(
    private readonly userRoleService: UserRoleService,
    private readonly userDataLoader: UserDataLoader,
  ) {}

  @Query(() => [UserRole])
  async getUserRoles() {
    return this.userRoleService.getUserRoles();
  }

  @Query(() => UserRole)
  async getUserRole(@Args('id') id: string) {
    return this.userRoleService.getUserRole(id);
  }

  @Mutation(() => UserRole)
  async createUserRole(@Args('data') data: CreateUserRoleInput) {
    return await this.userRoleService.createUserRole(data);
  }

  @Mutation(() => UserRole)
  async deleteUserRole(@Args('id') id: string) {
    return this.userRoleService.deleteUserRole(id);
  }

  @Mutation(() => UserRole)
  async addManagedGenres(
    @Args('id') id: string,
    @Args('genres', { type: () => [String] }) genres: string[],
  ) {
    return this.userRoleService.addManagedGenres(id, genres);
  }

  @Mutation(() => UserRole)
  async removeManagedGenres(
    @Args('id') id: string,
    @Args('genres', { type: () => [String] }) genres: string[],
  ) {
    return this.userRoleService.removeManagedGenres(id, genres);
  }

  @Mutation(() => UserRole)
  async assignUserRole(
    @Args('userId') userId: string,
    @Args('roleId') roleId: string,
  ) {
    return this.userRoleService.assignUserRole(userId, roleId);
  }

  @Mutation(() => UserRole)
  async unassignUserRole(
    @Args('userId') userId: string,
    @Args('roleId') roleId: string,
  ) {
    return this.userRoleService.unassignUserRole(userId, roleId);
  }

  @ResolveField('users', () => [User], { nullable: 'itemsAndList' })
  async users(@Parent() { userIds }: UserRole) {
    return userIds?.length
      ? await this.userDataLoader.createLoader().loadMany(userIds)
      : [];
  }
}
