import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import type { User } from 'prisma/generated/prisma';

@InputType()
export class UpdateUserInput
  implements Partial<Pick<User, 'email' | 'password'>>
{
  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(5, 10)
  @Field(() => String, { nullable: true })
  password?: string;
}
