import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleEnum } from 'prisma/generated/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignUserRoleSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async assignUserRole() {
    const userRole = await this.prisma.userRole.findUnique({
      where: { title: RoleEnum.USER },
    });

    if (!userRole) {
      console.warn('USER role not found. Make sure RoleSeeder runs first.');
      return;
    }

    const users = await this.prisma.user.findMany({
      include: { roles: true },
    });

    for (const user of users) {
      const hasUserRole = user.roles.some(
        (role) => role.title === RoleEnum.USER,
      );

      if (!hasUserRole) {
        await this.prisma.$transaction(
          async (tx) => {
            const updatedRoleIds = [...(user?.roleIds ?? []), userRole.id];

            await this.prisma.user.update({
              where: { id: user.id },
              data: {
                roleIds: {
                  set: updatedRoleIds,
                },
                roles: {
                  connect: { id: userRole.id },
                },
              },
            });

            const updatedUserIds = [...(userRole?.userIds ?? []), user.id];

            await tx.userRole.update({
              where: { id: userRole.id },
              data: {
                userIds: {
                  set: updatedUserIds,
                },
              },
            });
          },
          {
            isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
          },
        );
        console.warn(`Added role for user with id: ${user.id}`);
      }
    }
  }
}
