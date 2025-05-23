import { DEFAULT_ROLE_IDS } from 'src/common/db/default-role-ids';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Prisma, RoleEnum, type User } from 'prisma/generated/prisma';
import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import type { DBUserRole } from 'src/common/db/user-role.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async createUserWithUserRole(data: CreateUserInput): Promise<User> {
    const existed = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existed)
      throw new ConflictException('User with this email already exists');

    const userRole: DBUserRole | null = await this.prisma.userRole.findUnique({
      where: { id: DEFAULT_ROLE_IDS[RoleEnum.USER] },
    });

    if (!userRole) throw new NotFoundException('User role not found');

    return await this.prisma.$transaction(
      async (tx) => {
        const user = await tx.user.create({
          data: {
            ...data,
            roleIds: {
              set: [userRole.id],
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

        return user;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    if (data.email) {
      const existed = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existed)
        throw new ConflictException('User with this email already exists');
    }

    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async deleteUserWithRoleCleanup(userId: string): Promise<User> {
    return await this.prisma.$transaction(
      async (tx) => {
        const user = await tx.user.findUnique({
          where: { id: userId },
          include: { roles: true },
        });

        if (!user) {
          throw new NotFoundException('User not found');
        }

        for (const role of user.roles) {
          const updatedUserIds = role.userIds.filter((id) => id !== userId);

          await tx.userRole.update({
            where: { id: role.id },
            data: {
              userIds: updatedUserIds,
            },
          });
        }

        return await tx.user.delete({
          where: { id: userId },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }
}
