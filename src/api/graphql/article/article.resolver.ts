import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UserDataLoader } from 'src/infrastructure/data-loader/user.data-loader';
import { User } from '../user/models/user.model';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { UserWithRoles } from '../user/interfaces/user-with-roles.interface';
import { CheckPolicies } from 'src/infrastructure/casl/decorators/check-policies.decorator';
import { CreateArticlePolicyHandler } from 'src/infrastructure/casl';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userDataLoader: UserDataLoader,
  ) {}

  @Public()
  @Query(() => [Article])
  async getArticles(
    @Args('textContent', { nullable: true }) textContent?: string,
  ) {
    return textContent
      ? this.articleService.getArticlesByTextContent(textContent)
      : this.articleService.getArticlesCached();
  }

  @Public()
  @Query(() => Article)
  async getArticle(@Args('id') id: string) {
    return this.articleService.getArticle(id);
  }

  @Mutation(() => Article)
  @CheckPolicies(new CreateArticlePolicyHandler())
  async createArticle(
    @CurrentUser('id') id: string,
    @Args('data') data: CreateArticleInput,
  ) {
    return await this.articleService.createArticle(id, data);
  }

  @Mutation(() => Article)
  async updateArticle(
    @Args('id') id: string,
    @Args('data') data: UpdateArticleInput,
    @CurrentUser() user: UserWithRoles,
  ) {
    return await this.articleService.updateArticle(id, data, user);
  }

  @Mutation(() => Article)
  async deleteArticle(
    @Args('id') id: string,
    @CurrentUser() user: UserWithRoles,
  ) {
    return this.articleService.deleteArticle(id, user);
  }

  @ResolveField('author', () => User, { nullable: true })
  async user(@Parent() { authorId }: Article) {
    return await this.userDataLoader.createLoader().load(authorId);
  }
}
