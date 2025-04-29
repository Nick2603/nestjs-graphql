import { Field, ObjectType } from '@nestjs/graphql';
import type { User as PrismaUser } from '@prisma/client';
import { DbEntity } from 'src/common/dbEntity';

@ObjectType()
export class User extends DbEntity implements PrismaUser {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}
