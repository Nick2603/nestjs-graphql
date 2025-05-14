import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AppAbility, PolicyHandler } from '../interfaces';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { CaslService } from '../casl.service';
import { getGenericRequest } from 'src/common/utils/get-generic-request';
import type { UserWithRoles } from 'src/api/graphql/user/interfaces/user-with-roles.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslService: CaslService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const user = getGenericRequest(context).user as UserWithRoles;

    const ability = this.caslService.defineCaslAbility(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }

    return handler.handle(ability);
  }
}
