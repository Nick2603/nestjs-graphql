import { Field, ObjectType } from '@nestjs/graphql';
import type { Profile as PrismaProfile } from 'prisma/generated/prisma';
import { User } from 'src/api/graphql/user/models/user.model';
import { EntityGraphql } from 'src/common/graphql/entity.graphql';

@ObjectType()
export class Profile extends EntityGraphql implements PrismaProfile {
  @Field(() => String)
  name: string;

  @Field(() => String)
  userId: string;

  @Field(() => User)
  user: User;
}
