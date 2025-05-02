import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleEnum } from 'prisma/generated/prisma';
import { DEFAULT_ROLE_IDS } from 'src/common/db/defaultRoleIds';

@Injectable()
export class DefaultRolesSeeder {
  private readonly roles: RoleEnum[] = Object.values(RoleEnum);

  constructor(private readonly prisma: PrismaService) {}

  async seedDefaultRoles() {
    for (const role of this.roles) {
      const exists = await this.prisma.userRole.findUnique({
        where: { title: role },
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
