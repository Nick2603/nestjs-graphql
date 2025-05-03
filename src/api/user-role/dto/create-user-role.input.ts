import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { RoleEnum } from 'prisma/generated/prisma';
import type {
  DBUserRole,
  RoleManager,
} from 'src/common/db/user-role.interface';

@InputType()
export class CreateUserRoleInput
  implements
    Pick<DBUserRole, 'title'>,
    Partial<Pick<RoleManager, 'managedGenres'>>
{
  @IsEnum(RoleEnum)
  @Field(() => RoleEnum)
  title: RoleEnum;

  @IsOptional()
  @IsString({ each: true })
  @Length(2, 20, { each: true })
  @Field(() => [String], { nullable: true })
  managedGenres?: string[];
}
