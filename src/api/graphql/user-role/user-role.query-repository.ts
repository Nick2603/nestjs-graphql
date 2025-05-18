import { Injectable, NotFoundException } from '@nestjs/common';
import type { DBUserRole } from 'src/common/db/user-role.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRoleQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRolesWithCache(): Promise<DBUserRole[]> {
    return await this.prisma.withCacheExtension().userRole.findManyWithCache();
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getUserRole(id: string): Promise<DBUserRole | never> {
    const userRole = await this.prisma.userRole.findUnique({
      where: {
        id,
      },
    });

    if (!userRole) throw new NotFoundException('User role not found');

    return userRole;
  }
}
