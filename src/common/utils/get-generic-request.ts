import type { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext, type GqlContextType } from '@nestjs/graphql';
import { Request } from 'express';

export const getGenericRequest = (
  context: ExecutionContext,
): Request | never => {
  const getRequestHandler: Record<GqlContextType, () => Request | never> = {
    graphql: () => GqlExecutionContext.create(context).getContext().req,
    http: () => context.switchToHttp().getRequest(),
    rpc: () => {
      throw new Error('rpc request handler in not implemented');
    },
    ws: () => {
      throw new Error('rpc request handler in not implemented');
    },
  };

  return getRequestHandler[context.getType<GqlContextType>()]();
};
