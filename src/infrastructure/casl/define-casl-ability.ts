import { defineAbility } from '@casl/ability';
import { RoleEnum } from 'prisma/generated/prisma';
import type { RoleManager } from 'src/common/db/user-role.interface';
import {
  Action,
  type AppAbility,
  CaslSubject,
  type UserForCasl,
} from './interfaces';

export const defineCaslAbility = (user: UserForCasl) =>
  defineAbility<AppAbility>((can, cannot) => {
    cannot(Action.MANAGE, CaslSubject.ALL);

    can(Action.READ, CaslSubject.ALL);

    if (user?.roles.some((role) => role.title === RoleEnum.USER)) {
      can(Action.CREATE, CaslSubject.ARTICLE);

      can([Action.UPDATE, Action.DELETE], CaslSubject.ARTICLE, {
        authorId: user.id,
      });
    }

    if (user?.roles.some((role) => role.title === RoleEnum.MANAGER)) {
      can([Action.UPDATE, Action.DELETE], CaslSubject.ARTICLE, {
        genres: {
          $in: user?.roles?.find(
            (role): role is RoleManager => role.title === RoleEnum.MANAGER,
          )?.managedGenres,
        },
      });
    }

    if (user?.roles.some((role) => role.title === RoleEnum.ADMIN)) {
      can([Action.UPDATE, Action.DELETE], CaslSubject.ARTICLE);
    }
  });
