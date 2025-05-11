import type { Article } from 'prisma/generated/prisma';

export const articleUpdatedEventKey = 'article.updated' as const;

export class ArticleUpdated implements Article {
  readonly id: string;
  readonly text: string;
  readonly genres: string[];
  readonly authorId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(article: Article) {
    this.id = article.id;
    this.text = article.text;
    this.genres = article.genres;
    this.authorId = article.authorId;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }
}
