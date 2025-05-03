import type { UserRole as PrismaUserRole } from 'prisma/generated/prisma';

type RoleUser = Omit<PrismaUserRole, 'managedGenres'>;

type RoleAdmin = Omit<PrismaUserRole, 'managedGenres'>;

export type RoleManager = PrismaUserRole;

export type DBUserRole = RoleUser | RoleAdmin | RoleManager;
