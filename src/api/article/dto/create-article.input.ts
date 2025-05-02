import { ArrayNotEmpty, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import type { Article } from 'prisma/generated/prisma';

@InputType()
export class CreateArticleInput implements Pick<Article, 'text' | 'genres'> {
  @IsString()
  @Length(10, 200)
  @Field(() => String)
  text: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(2, 20, { each: true })
  @Field(() => [String])
  genres: string[];
}
