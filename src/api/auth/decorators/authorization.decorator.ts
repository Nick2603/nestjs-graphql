import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { RoleEnum } from 'prisma/generated/prisma';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

export function Authorization(...roles: RoleEnum[]) {
  if (roles.length)
    return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard));

  return applyDecorators(UseGuards(JwtGuard));
}
