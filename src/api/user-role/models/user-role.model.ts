import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  RoleEnum,
  type UserRole as PrismaUserRole,
} from 'prisma/generated/prisma';
import { User } from 'src/api/user/models/user.model';
import { EntityGraphql } from 'src/common/graphql/entity.graphql';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

@ObjectType()
export class UserRole extends EntityGraphql implements PrismaUserRole {
  @Field(() => RoleEnum)
  title: RoleEnum;

  @Field(() => [String], { nullable: 'itemsAndList' })
  userIds: string[];

  @Field(() => [User], { nullable: 'itemsAndList' })
  users: User[];

  @Field(() => [String])
  managedGenres: string[];
}
