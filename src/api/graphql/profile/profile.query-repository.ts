import { Injectable, NotFoundException } from '@nestjs/common';
import type { Profile } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class ProfileQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProfilesWithCache(): Promise<Profile[]> {
    return await this.prisma.withCacheExtension().profile.findManyWithCache();
  }

  /**
   * Throws NotFoundException if profile is not found.
   */
  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    return profile;
  }
}
