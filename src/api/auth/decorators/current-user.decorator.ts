import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'prisma/generated/prisma';

export const CurrentUser = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const user: User =
      GqlExecutionContext.create(context).getContext().req.user;

    return data ? user[data] : user;
  },
);
