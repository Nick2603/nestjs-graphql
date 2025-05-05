import { SetMetadata } from '@nestjs/common';
import type { RoleEnum } from 'prisma/generated/prisma';

export const ROLES_KEY = 'roles' as const;

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
