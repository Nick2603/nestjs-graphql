import { RoleEnum } from 'prisma/generated/prisma';

export const DEFAULT_ROLE_IDS = {
  [RoleEnum.USER]: '164a3e62-84a4-43ff-ae94-e352b3e26673',
  [RoleEnum.MANAGER]: '88f3a0eb-941d-4406-9197-9710749ec467',
  [RoleEnum.ADMIN]: '9f2fd492-3165-446d-9780-63601e9d9910',
} satisfies Record<RoleEnum, string>;
