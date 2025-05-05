import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import type { User } from 'prisma/generated/prisma';
import type { UserWithRoles } from './interfaces/user-with-roles.interface';

@Injectable()
export class UserQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getUser(id: string): Promise<User | never> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getUserWithRoles(id: string): Promise<UserWithRoles | never> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        roles: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getUserByEmail(email: string): Promise<User | never> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
