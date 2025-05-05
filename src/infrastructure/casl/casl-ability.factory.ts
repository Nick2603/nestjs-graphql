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
import { Profile } from 'src/api/graphql/profile/models/profile.model';
import type { UserWithRoles } from 'src/api/graphql/user/interfaces/user-with-roles.interface';

type Subjects =
  | InferSubjects<
      (typeof User & { roles: UserRole }) | typeof Article | typeof Profile
    >
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

    if (user?.roles.some((role) => role.title === RoleEnum.ADMIN)) {
      can([Action.Update, Action.Delete], Article);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
