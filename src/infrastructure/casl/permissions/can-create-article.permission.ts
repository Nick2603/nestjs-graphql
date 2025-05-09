import { defineCaslAbility } from '../define-casl-ability';
import { Action, CaslSubject, type UserForCasl } from '../interfaces';
import { UnauthorizedException } from '@nestjs/common';

export const canCreateArticle = (user: UserForCasl): void => {
  const ability = defineCaslAbility(user);

  if (!ability.can(Action.CREATE, CaslSubject.ARTICLE))
    throw new UnauthorizedException(
      'You have no permissions to create an article',
    );
};
