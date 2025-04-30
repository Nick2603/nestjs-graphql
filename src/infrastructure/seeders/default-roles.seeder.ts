import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleEnum } from 'prisma/generated/prisma';

@Injectable()
export class DefaultRolesSeeder {
  constructor(private readonly prisma: PrismaService) {}

  async seedDefaultRoles() {
    const roles: RoleEnum[] = [RoleEnum.USER, RoleEnum.MANAGER, RoleEnum.ADMIN];

    for (const role of roles) {
      const exists = await this.prisma.userRole.findUnique({
        where: { title: role },
      });

      if (!exists) {
        await this.prisma.userRole.create({
          data: { title: role },
        });
        console.log(`Seeded role: ${role}`);
      }
    }
  }
}
