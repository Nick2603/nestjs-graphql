export const ROUTES = {
  GRAPHQL: '/graphql',
  REPORTS: {
    ROOT: '/reports',
    ARTICLES_REPORT: '/articles-report',
  },
} as const satisfies Record<string, string | Record<string, string>>;
