import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import type { CreateProfileInput } from './dto/create-profile.input';
import type { UpdateProfileInput } from './dto/update-profile.input';
import { Prisma, type Profile } from 'prisma/generated/prisma';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(
    userId: string,
    data: CreateProfileInput,
  ): Promise<Profile> {
    return await this.prisma.$transaction(
      async (tx) => {
        const profile = await tx.profile.create({
          data: {
            ...data,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        await tx.user.update({
          where: { id: userId },
          data: {
            profileId: profile.id,
          },
        });

        return profile;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileInput,
  ): Promise<Profile> {
    return await this.prisma.profile.update({
      where: { userId },
      data,
    });
  }
}
