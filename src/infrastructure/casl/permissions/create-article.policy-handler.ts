import type { AppAbility, IPolicyHandler } from '../interfaces';
import { Action, CaslSubject } from '../interfaces';

export class CreateArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.CREATE, CaslSubject.ARTICLE);
  }
}
