import { IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import type { Profile } from 'prisma/generated/prisma';

@InputType()
export class CreateProfileInput implements Pick<Profile, 'name'> {
  @IsString()
  @Length(2, 15)
  @Field(() => String)
  name: string;
}
