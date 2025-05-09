import type { Article, User, UserRole } from 'prisma/generated/prisma';

type UserRoleForCasl = Pick<UserRole, 'title'> &
  Partial<Pick<UserRole, 'managedGenres'>>;

export type UserForCasl = Pick<User, 'id'> & { roles: UserRoleForCasl[] };

export type ArticleForCasl = Pick<Article, 'authorId' | 'genres'>;

export enum Action {
  MANAGE = 'Manage',
  READ = 'Read',
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete',
}

export enum CaslSubject {
  ALL = 'all',
  ARTICLE = 'Article',
}
