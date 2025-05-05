export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type AccessToken = Pick<AuthTokens, 'accessToken'>;
