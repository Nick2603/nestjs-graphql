import { Field, ObjectType } from '@nestjs/graphql';
import type { User as PrismaUser } from 'prisma/generated/prisma';
import { Profile } from 'src/api/profile/models/profile.model';
import { DbEntity } from 'src/common/dbEntity';

@ObjectType()
export class User extends DbEntity implements PrismaUser {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  profileId: string | null;

  @Field(() => Profile, { nullable: true })
  profile: Profile | null;

  @Field(() => String, { nullable: true })
  roleIds: string[];

  @Field(() => Profile, { nullable: true })
  roles: Profile | null;
}
