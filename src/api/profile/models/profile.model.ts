import { Field, ObjectType } from '@nestjs/graphql';
import type { Profile as PrismaProfile } from 'prisma/generated/prisma';
import { User } from 'src/api/user/models/user.model';
import { DbEntity } from 'src/common/dbEntity';

@ObjectType()
export class Profile extends DbEntity implements PrismaProfile {
  @Field(() => String)
  name: string;

  @Field(() => String)
  userId: string;

  @Field(() => User)
  user: User;
}
