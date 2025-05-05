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
import { CheckPolicies } from 'src/infrastructure/casl/decorators/check-policies.decorator';
import { UpdateArticlePolicyHandler } from 'src/infrastructure/casl/policy-handlers/update-article.policy-handler';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userDataLoader: UserDataLoader,
  ) {}

  // @Public()
  @CheckPolicies(new UpdateArticlePolicyHandler())
  @Query(() => [Article])
  async getArticles() {
    return this.articleService.getArticles();
  }

  @Public()
  @Query(() => Article)
  async getArticle(@Args('id') id: string) {
    return this.articleService.getArticle(id);
  }

  @Mutation(() => Article)
  async createArticle(
    @Args('userId') userId: string,
    @Args('data') data: CreateArticleInput,
  ) {
    return await this.articleService.createArticle(userId, data);
  }

  @Mutation(() => Article)
  async updateArticle(
    @Args('id') id: string,
    @Args('data') data: UpdateArticleInput,
  ) {
    return await this.articleService.updateArticle(id, data);
  }

  @Mutation(() => Article)
  async deleteArticle(@Args('id') id: string) {
    return this.articleService.deleteArticle(id);
  }

  @ResolveField('author', () => User, { nullable: true })
  async user(@Parent() { authorId }: Article) {
    return await this.userDataLoader.createLoader().load(authorId);
  }
}
