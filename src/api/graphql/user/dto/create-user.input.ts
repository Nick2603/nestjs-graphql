import { IsEmail, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import type { User } from 'prisma/generated/prisma';

@InputType()
export class CreateUserInput implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Length(5, 10)
  @Field(() => String)
  password: string;
}
