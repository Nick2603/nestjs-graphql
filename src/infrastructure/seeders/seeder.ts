import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DefaultRolesSeeder } from './default-roles.seeder';
import { AssignUserRoleSeeder } from './assign-user-role.seeder';

@Injectable()
export class Seeder implements OnApplicationBootstrap {
  constructor(
    private readonly defaultRolesSeeder: DefaultRolesSeeder,
    private readonly assignUserRoleSeeder: AssignUserRoleSeeder,
  ) {}

  async onApplicationBootstrap() {
    await this.defaultRolesSeeder.seedDefaultRoles();

    await this.assignUserRoleSeeder.assignUserRole();
  }
}
