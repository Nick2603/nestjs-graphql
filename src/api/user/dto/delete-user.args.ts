import { IsString, Length } from 'class-validator';
import { Field, ArgsType, ID } from '@nestjs/graphql';
import type { User } from '@prisma/client';

@ArgsType()
export class DeleteUserArgs implements Pick<User, 'id'> {
  @IsString()
  @Length(3, 50)
  @Field(() => ID)
  id: string;
}
