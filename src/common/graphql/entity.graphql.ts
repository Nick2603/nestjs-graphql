import { ObjectType } from '@nestjs/graphql';
import { IEntityGraphql } from './entity.graphql.interface';

@ObjectType({ isAbstract: true, implements: () => [IEntityGraphql] })
export abstract class EntityGraphql implements IEntityGraphql {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
