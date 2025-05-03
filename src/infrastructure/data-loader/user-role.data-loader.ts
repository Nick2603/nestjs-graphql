import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as DataLoader from 'dataloader';
import type { DBUserRole } from 'src/common/db/user-role.interface';

@Injectable({ scope: Scope.REQUEST })
export class UserRoleDataLoader {
  constructor(private readonly prisma: PrismaService) {}

  createLoader() {
    return new DataLoader<string, DBUserRole | null>(
      async (userRoleIds: readonly string[]) => {
        const userRoles = await this.prisma.userRole.findMany({
          where: {
            id: { in: userRoleIds as string[] },
          },
        });

        const userRoleMap = new Map(
          userRoles.map((userRole) => [userRole.id, userRole]),
        );
        return userRoleIds.map((id) => userRoleMap.get(id) || null);
      },
    );
  }
}
