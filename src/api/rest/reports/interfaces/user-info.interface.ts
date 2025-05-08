import { RoleEnum } from 'prisma/generated/prisma';

export interface UserInfo {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    name: string;
  } | null;
  roles: {
    title: RoleEnum;
  }[];
}
