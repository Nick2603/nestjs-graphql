import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import type { CreateUserRoleInput } from './dto/create-user-role.input';
import { Prisma } from 'prisma/generated/prisma';
import type { DBUserRole } from 'src/common/db/user-role.interface';

@Injectable()
export class UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserRole(data: CreateUserRoleInput): Promise<DBUserRole> {
    return await this.prisma.userRole.create({
      data,
    });
  }

  async deleteUserRole(id: string): Promise<DBUserRole> {
    return await this.prisma.userRole.delete({
      where: {
        id,
      },
    });
  }

  async deleteUserRoleWithCleanUp(roleId: string): Promise<DBUserRole> {
    return await this.prisma.$transaction(
      async (tx) => {
        const userRole = await tx.userRole.findUnique({
          where: { id: roleId },
          include: { users: true },
        });

        if (!userRole) {
          throw new NotFoundException('User role not found');
        }

        for (const user of userRole.users) {
          const updatedRoleIds = user.roleIds.filter((id) => id !== roleId);

          await tx.user.update({
            where: { id: user.id },
            data: {
              roleIds: { set: updatedRoleIds },
            },
          });
        }

        return await this.prisma.userRole.delete({
          where: {
            id: roleId,
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }

  async addManagedGenres(id: string, genres: string[]): Promise<DBUserRole> {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id },
      select: { managedGenres: true },
    });

    if (!userRole) {
      throw new NotFoundException('User role not found');
    }

    const updatedGenres: string[] = [
      ...new Set([...userRole.managedGenres, ...genres]),
    ];

    return this.prisma.userRole.update({
      where: { id },
      data: {
        managedGenres: { set: updatedGenres },
      },
    });
  }

  async removeManagedGenres(id: string, genres: string[]): Promise<DBUserRole> {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id },
      select: { managedGenres: true },
    });

    if (!userRole) {
      throw new NotFoundException('User role not found');
    }

    const updatedGenres: string[] = userRole.managedGenres.filter(
      (genre) => !genres.includes(genre),
    );

    return this.prisma.userRole.update({
      where: { id },
      data: {
        managedGenres: { set: updatedGenres },
      },
    });
  }

  async assignUserRole(userId: string, roleId: string): Promise<DBUserRole> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      const role = await tx.userRole.findUnique({ where: { id: roleId } });

      if (!user) throw new NotFoundException('User not found');

      if (!role) throw new NotFoundException('Role not found');

      if (user.roleIds.includes(roleId)) return role;

      await tx.user.update({
        where: { id: userId },
        data: {
          roles: { connect: { id: roleId } },
          roleIds: { set: [...user.roleIds, roleId] },
        },
      });

      const updatedUserIds = [...new Set([...role.userIds, userId])];

      return tx.userRole.update({
        where: { id: roleId },
        data: {
          userIds: { set: updatedUserIds },
        },
      });
    });
  }

  async unassignUserRole(userId: string, roleId: string): Promise<DBUserRole> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      const role = await tx.userRole.findUnique({ where: { id: roleId } });

      if (!user) throw new NotFoundException('User not found');

      if (!role) throw new NotFoundException('Role not found');

      if (!user.roleIds.includes(roleId)) return role;

      const updatedUserRoleIds = user.roleIds.filter((id) => id !== roleId);

      await tx.user.update({
        where: { id: userId },
        data: {
          roles: { disconnect: { id: roleId } },
          roleIds: { set: updatedUserRoleIds },
        },
      });

      const updatedUserIds = role.userIds.filter((id) => id !== userId);

      return tx.userRole.update({
        where: { id: roleId },
        data: {
          userIds: { set: updatedUserIds },
        },
      });
    });
  }
}
