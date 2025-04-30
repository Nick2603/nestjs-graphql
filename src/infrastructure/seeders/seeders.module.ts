import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DefaultRolesSeeder } from './default-roles.seeder';
import { AssignUserRoleSeeder } from './assign-user-role.seeder';
import { Seeder } from './seeder';

@Module({
  imports: [PrismaModule],
  providers: [DefaultRolesSeeder, AssignUserRoleSeeder, Seeder],
})
export class SeedersModule {}
