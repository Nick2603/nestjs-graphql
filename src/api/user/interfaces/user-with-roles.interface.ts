import type { User } from 'prisma/generated/prisma';
import type { DBUserRole } from 'src/common/db/user-role.interface';

export interface UserWithRoles extends User {
  roles: DBUserRole[];
}
