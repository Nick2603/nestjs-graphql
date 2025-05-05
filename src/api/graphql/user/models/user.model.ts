import { Field, ObjectType } from '@nestjs/graphql';
import type { User as PrismaUser } from 'prisma/generated/prisma';
import { Article } from 'src/api/graphql/article/models/article.model';
import { Profile } from 'src/api/graphql/profile/models/profile.model';
import { UserRole } from 'src/api/graphql/user-role/models/user-role.model';
import { EntityGraphql } from 'src/common/graphql/entity.graphql';

@ObjectType()
export class User extends EntityGraphql implements PrismaUser {
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

  @Field(() => [String], { nullable: true })
  articleIds: string[];

  @Field(() => [Article], { nullable: true })
  articles: Article[];
}
