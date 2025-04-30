import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateProfileInput } from './dto/create-profile.input';
import { User } from '../user/models/user.model';
import { UserDataLoader } from 'src/infrastructure/data-loader/user.data-loader';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userDataLoader: UserDataLoader,
  ) {}

  @Query(() => [Profile])
  async getProfiles() {
    return this.profileService.getProfiles();
  }

  @Query(() => Profile)
  async getProfile(@Args('userId') userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Mutation(() => Profile)
  async createProfile(
    @Args('userId') userId: string,
    @Args('data') data: CreateProfileInput,
  ) {
    return await this.profileService.createProfile(userId, data);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('userId') userId: string,
    @Args('data') data: UpdateProfileInput,
  ) {
    return await this.profileService.updateProfile(userId, data);
  }

  @ResolveField('user', () => User, { nullable: true })
  async user(@Parent() { userId }: Profile) {
    return await this.userDataLoader.createLoader().load(userId);
  }
}
