import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  type InferSubjects,
  type MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/api/graphql/user/models/user.model';
import { Action } from './action.enum';
import { Article } from 'src/api/graphql/article/models/article.model';
import { UserRole } from 'src/api/graphql/user-role/models/user-role.model';
import { RoleEnum } from 'prisma/generated/prisma';
import type { UserWithRoles } from 'src/api/graphql/user/interfaces/user-with-roles.interface';
import type { RoleManager } from 'src/common/db/user-role.interface';

type Subjects =
  | InferSubjects<(typeof User & { roles: UserRole }) | typeof Article>
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserWithRoles) {
    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<[Action, Subjects]>
    >(createMongoAbility);

    cannot(Action.Manage, 'all');

    can(Action.Read, 'all');

    if (user?.roles.some((role) => role.title === RoleEnum.USER)) {
      can(Action.Create, Article);

      can([Action.Update, Action.Delete], Article, { authorId: user.id });
    }

    if (user?.roles.some((role) => role.title === RoleEnum.MANAGER)) {
      can([Action.Update, Action.Delete], Article, {
        genres: {
          $in: user?.roles?.find(
            (role): role is RoleManager => role.title === RoleEnum.MANAGER,
          )?.managedGenres,
        },
      });
    }

    if (user?.roles.some((role) => role.title === RoleEnum.ADMIN)) {
      can([Action.Update, Action.Delete], Article);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
