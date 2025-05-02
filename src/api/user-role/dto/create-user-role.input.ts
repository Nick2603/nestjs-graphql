import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { RoleEnum, type UserRole } from 'prisma/generated/prisma';

@InputType()
export class CreateUserRoleInput
  implements Pick<UserRole, 'title'>, Partial<Pick<UserRole, 'managedGenres'>>
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
