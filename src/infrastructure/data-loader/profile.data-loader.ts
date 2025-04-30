import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Profile } from 'prisma/generated/prisma';
import * as DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ProfileDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  createLoader() {
    return new DataLoader<string | null, Profile | null>(
      async (profileIds: readonly string[]) => {
        const validIds = profileIds.filter(Boolean);

        const profiles = await this.prisma.profile.findMany({
          where: {
            id: { in: validIds },
          },
        });

        const profileMap = new Map(
          profiles.map((profile) => [profile.id, profile]),
        );

        return profileIds.map((id) =>
          id ? (profileMap.get(id) ?? null) : null,
        );
      },
    );
  }
}
