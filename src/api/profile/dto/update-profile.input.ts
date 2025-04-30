import { IsOptional, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import type { Profile } from 'prisma/generated/prisma';

@InputType()
export class UpdateProfileInput implements Partial<Pick<Profile, 'name'>> {
  @IsOptional()
  @IsString()
  @Length(2, 15)
  @Field(() => String, { nullable: true })
  name?: string;
}
