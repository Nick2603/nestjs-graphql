import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileQueryRepository } from './profile.query-repository';
import type { Profile } from 'prisma/generated/prisma';
import type { UpdateProfileInput } from './dto/update-profile.input';
import type { CreateProfileInput } from './dto/create-profile.input';
import { UserQueryRepository } from '../user/user.query-repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileQueryRepository: ProfileQueryRepository,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async getProfiles(): Promise<Profile[]> {
    return await this.profileQueryRepository.getProfiles();
  }

  async getProfile(userId: string): Promise<Profile> {
    return await this.profileQueryRepository.getProfile(userId);
  }

  async createProfile(
    userId: string,
    data: CreateProfileInput,
  ): Promise<Profile> {
    if (!userId) throw new BadRequestException('userId must be specified');

    const { id: profileUserId } =
      await this.userQueryRepository.getUser(userId);

    return await this.profileRepository.createProfile(profileUserId, data);
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileInput,
  ): Promise<Profile> {
    if (!userId) throw new BadRequestException('userId must be specified');

    const { userId: profileUserId } = await this.getProfile(userId);

    return await this.profileRepository.updateProfile(profileUserId, data);
  }
}
