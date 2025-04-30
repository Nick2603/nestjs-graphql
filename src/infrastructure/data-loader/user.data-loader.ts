import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as DataLoader from 'dataloader';
import type { User } from 'prisma/generated/prisma';

@Injectable({ scope: Scope.REQUEST })
export class UserDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  createLoader() {
    return new DataLoader<string, User | null>(
      async (userIds: readonly string[]) => {
        const users = await this.prisma.user.findMany({
          where: {
            id: { in: userIds as string[] },
          },
        });

        const userMap = new Map(users.map((user) => [user.id, user]));
        return userIds.map((id) => userMap.get(id) || null);
      },
    );
  }
}
