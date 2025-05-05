import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { UserWithRoles } from 'src/api/graphql/user/interfaces/user-with-roles.interface';
import { getGenericRequest } from 'src/common/utils/get-generic-request';

export const CurrentUser = createParamDecorator(
  (data: keyof UserWithRoles, context: ExecutionContext) => {
    const user = getGenericRequest(context).user as UserWithRoles;

    return data ? user[data] : user;
  },
);
