export const articleDeletedEventKey = 'article.deleted' as const;

export class ArticleDeleted {
  constructor(readonly id: string) {}
}
