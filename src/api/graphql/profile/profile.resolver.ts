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
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userDataLoader: UserDataLoader,
  ) {}

  @Public()
  @Query(() => [Profile])
  async getProfiles() {
    return this.profileService.getProfilesCached();
  }

  @Public()
  @Query(() => Profile)
  async getProfile(@Args('userId') userId: string) {
    return this.profileService.getProfileCached(userId);
  }

  @Mutation(() => Profile)
  async createProfile(
    @CurrentUser('id') id: string,
    @Args('data') data: CreateProfileInput,
  ) {
    return await this.profileService.createProfile(id, data);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @CurrentUser('id') id: string,
    @Args('data') data: UpdateProfileInput,
  ) {
    return await this.profileService.updateProfile(id, data);
  }

  @ResolveField('user', () => User, { nullable: true })
  async user(@Parent() { userId }: Profile) {
    return await this.userDataLoader.createLoader().load(userId);
  }
}
