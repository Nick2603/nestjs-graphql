import { ArrayNotEmpty, IsEnum, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { RoleEnum, type UserRole } from 'prisma/generated/prisma';

@InputType()
export class CreateUserRoleInput
  implements Pick<UserRole, 'title' | 'managedGenres'>
{
  @IsEnum(RoleEnum)
  @Field(() => RoleEnum)
  title: RoleEnum;

  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(2, 20, { each: true })
  @Field(() => [String])
  managedGenres: string[];
}
