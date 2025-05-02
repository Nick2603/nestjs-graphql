import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class IEntityGraphql {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
