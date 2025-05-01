import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  RoleEnum,
  type UserRole as PrismaUserRole,
} from 'prisma/generated/prisma';
import { User } from 'src/api/user/models/user.model';
import { DbEntity } from 'src/common/dbEntity';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});

@ObjectType()
export class UserRole extends DbEntity implements PrismaUserRole {
  @Field(() => RoleEnum)
  title: RoleEnum;

  @Field(() => [String], { nullable: 'itemsAndList' })
  userIds: string[];

  @Field(() => [User], { nullable: 'itemsAndList' })
  users: User[];

  @Field(() => [String])
  managedGenres: string[];
}
