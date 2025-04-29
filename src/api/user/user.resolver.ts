import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { GetUserArgs } from './dto/get-user.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserArgs } from './dto/delete-user.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => User)
  async getUser(@Args() args: GetUserArgs) {
    return this.userService.getUser(args);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.userService.createUser(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ) {
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => User)
  async deleteUser(@Args() args: DeleteUserArgs) {
    return this.userService.deleteUser(args);
  }
}
