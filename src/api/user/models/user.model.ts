import { Field, ObjectType } from '@nestjs/graphql';
import type { User as PrismaUser } from 'prisma/generated/prisma';
import { Profile } from 'src/api/profile/models/profile.model';
import { UserRole } from 'src/api/user-role/models/user-role.model';
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

  @Field(() => [String], { nullable: true })
  roleIds: string[];

  @Field(() => [UserRole])
  roles: UserRole[];
}
