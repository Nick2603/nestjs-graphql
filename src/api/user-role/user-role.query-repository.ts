import { Injectable, NotFoundException } from '@nestjs/common';
import type { UserRole } from 'prisma/generated/prisma';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRoleQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRoles(): Promise<UserRole[]> {
    return await this.prisma.userRole.findMany();
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getUserRole(id: string): Promise<UserRole> {
    const userRole = await this.prisma.userRole.findUnique({
      where: {
        id,
      },
    });

    if (!userRole) throw new NotFoundException('User role not found');

    return userRole;
  }
}
