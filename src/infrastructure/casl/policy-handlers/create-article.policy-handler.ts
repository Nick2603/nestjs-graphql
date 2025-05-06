import { Action } from '../action.enum';
import type { AppAbility } from '../casl-ability.factory';
import type { IPolicyHandler } from '../interfaces/policy-handler.interface';
import { Article } from 'src/api/graphql/article/models/article.model';

export class CreateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, Article);
  }
}
