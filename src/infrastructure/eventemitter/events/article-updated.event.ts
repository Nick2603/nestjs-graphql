export const articleUpdatedEventKey = 'article.updated' as const;

export class ArticleUpdated {
  constructor(
    readonly id: string,
    readonly text: string,
    readonly genres: string[],
  ) {}
}
