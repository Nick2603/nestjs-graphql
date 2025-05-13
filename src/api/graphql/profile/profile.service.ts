import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileQueryRepository } from './profile.query-repository';
import type { Profile } from 'prisma/generated/prisma';
import type { UpdateProfileInput } from './dto/update-profile.input';
import type { CreateProfileInput } from './dto/create-profile.input';
import { UserQueryRepository } from '../user/user.query-repository';
import { AppCacheService } from 'src/infrastructure/cache/app-cache.service';
import {
  CACHE_KEYS,
  getCachedKeyById,
} from 'src/infrastructure/cache/cache-keys';

@Injectable()
export class ProfileService {
  private readonly cacheTtl: number = 60_000;

  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly profileQueryRepository: ProfileQueryRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly appCacheService: AppCacheService,
  ) {}

  async getProfilesCached(): Promise<Profile[]> {
    const cachedProfiles = await this.appCacheService.get<Profile[]>(
      CACHE_KEYS.PROFILES,
    );

    if (cachedProfiles) return cachedProfiles;

    const profiles = await this.profileQueryRepository.getProfiles();

    await this.appCacheService.set(
      CACHE_KEYS.PROFILES,
      profiles,
      this.cacheTtl,
    );

    return profiles;
  }

  async getProfile(userId: string): Promise<Profile> {
    return await this.profileQueryRepository.getProfile(userId);
  }

  async getProfileCached(userId: string): Promise<Profile> {
    const cacheKeyByUserId = getCachedKeyById(userId, CACHE_KEYS.PROFILES);

    const cachedProfile =
      await this.appCacheService.get<Profile>(cacheKeyByUserId);

    if (cachedProfile) return cachedProfile;

    const profile = await this.profileQueryRepository.getProfile(userId);

    await this.appCacheService.set(cacheKeyByUserId, profile, this.cacheTtl);

    return profile;
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
