import type { Request, Response } from 'express';

export interface GraphQLContext {
  req: Request;
  res: Response;
}
