import { Field, ObjectType } from '@nestjs/graphql';
import type { Article as PrismaArticle } from 'prisma/generated/prisma';
import { User } from 'src/api/graphql/user/models/user.model';
import { EntityGraphql } from 'src/common/graphql/entity.graphql';

@ObjectType()
export class Article extends EntityGraphql implements PrismaArticle {
  @Field(() => String)
  text: string;

  @Field(() => [String])
  genres: string[];

  @Field(() => String)
  authorId: string;

  @Field(() => User)
  author: User;
}
