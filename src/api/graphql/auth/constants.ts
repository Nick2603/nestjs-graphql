import type { SignOptions } from 'jsonwebtoken';

export const JWT_ALGORITHM: SignOptions['algorithm'] = 'HS256' as const;
