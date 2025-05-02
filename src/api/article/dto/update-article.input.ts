import { IsOptional, IsString, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import type { Article } from 'prisma/generated/prisma';

@InputType()
export class UpdateArticleInput
  implements Partial<Pick<Article, 'text' | 'genres'>>
{
  @IsOptional()
  @IsString()
  @Length(10, 200)
  @Field(() => String, { nullable: true })
  text?: string;

  @IsOptional()
  @IsString({ each: true })
  @Length(2, 20, { each: true })
  @Field(() => [String], { nullable: 'itemsAndList' })
  genres?: string[];
}
