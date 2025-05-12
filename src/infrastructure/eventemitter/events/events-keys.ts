export const EVENTS_KEYS = {
  ARTICLE_CREATED: 'article.created',
  ARTICLE_UPDATED: 'article.updated',
  ARTICLE_DELETED: 'article.deleted',
} as const satisfies Record<string, string>;
