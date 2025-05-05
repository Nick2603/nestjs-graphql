import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';
import { User } from 'prisma/generated/prisma';

@InputType()
export class AuthInput implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Length(5, 10)
  @Field(() => String)
  password: string;
}
