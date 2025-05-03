import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleEnum } from 'prisma/generated/prisma';
import { DEFAULT_ROLE_IDS } from 'src/common/db/defaultRoleIds';

@Injectable()
export class DefaultRolesSeeder {
  private readonly defaultRoles = Object.values(RoleEnum).filter(
    (role) => role === RoleEnum.ADMIN || role === RoleEnum.USER,
  );

  constructor(private readonly prisma: PrismaService) {}

  async seedDefaultRoles() {
    for (const role of this.defaultRoles) {
      const exists = await this.prisma.userRole.findUnique({
        where: { id: DEFAULT_ROLE_IDS[role] },
      });

      if (!exists) {
        await this.prisma.userRole.create({
          data: { title: role, id: DEFAULT_ROLE_IDS[role] },
        });
        console.log(`Seeded role: ${role}`);
      }
    }
  }
}
