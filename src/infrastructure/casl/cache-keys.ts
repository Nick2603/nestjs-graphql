export const CACHE_KEYS = {
  ARTICLES: 'ARTICLES',
  PROFILES: 'PROFILES',
  USERS: 'USERS',
  USER_ROLES: 'USER_ROLES',
} as const satisfies Record<string, string>;

export const getCachedKeyById = (
  id: string,
  cacheKey: keyof typeof CACHE_KEYS,
): string => `${CACHE_KEYS[cacheKey]}:${id}`;
