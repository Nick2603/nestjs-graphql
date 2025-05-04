import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { RoleEnum } from 'prisma/generated/prisma';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { UserWithRoles } from 'src/api/user/interfaces/user-with-roles.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) return true;

    const user: UserWithRoles =
      GqlExecutionContext.create(context).getContext().req.user;

    return requiredRoles.some((requiredRole) =>
      user.roles.some((userRole) => userRole.title === requiredRole),
    );
  }
}
