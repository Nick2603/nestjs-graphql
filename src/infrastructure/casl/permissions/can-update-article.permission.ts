import { subject } from '@casl/ability';
import type { CaslService } from '../casl.service';
import {
  Action,
  CaslSubject,
  type ArticleForCasl,
  type UserForCasl,
} from '../interfaces';
import { UnauthorizedException } from '@nestjs/common';

export const canUpdateArticle = (
  user: UserForCasl,
  article: ArticleForCasl,
  caslService: CaslService,
): void => {
  const ability = caslService.defineCaslAbility(user);

  if (!ability.can(Action.UPDATE, subject(CaslSubject.ARTICLE, article)))
    throw new UnauthorizedException(
      'You have no permissions to update this article',
    );
};
