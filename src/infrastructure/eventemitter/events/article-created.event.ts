export const articleCreatedEventKey = 'article.created' as const;

export class ArticleCreated {
  constructor(
    readonly id: string,
    readonly text: string,
    readonly genres: string[],
  ) {}
}
