import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRoleQueryRepository } from './user-role.query-repository';
import { UserRoleRepository } from './user-role.repository';
import type { CreateUserRoleInput } from './dto/create-user-role.input';
import { RoleEnum } from 'prisma/generated/prisma';
import { sanitizeGenres } from 'src/common/utils/sanitize-genres';
import type { DBUserRole } from 'src/common/db/user-role.interface';
import { AppCacheService } from 'src/infrastructure/cache/app-cache.service';
import { CACHE_KEYS, getCachedKeyById } from 'src/infrastructure/casl';

@Injectable()
export class UserRoleService {
  private readonly cacheTtl: number = 60_000;

  constructor(
    private readonly userRoleQueryRepository: UserRoleQueryRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly appCacheService: AppCacheService,
  ) {}

  async getUserRolesCached(): Promise<DBUserRole[]> {
    const cachedUserRoles = await this.appCacheService.get<DBUserRole[]>(
      CACHE_KEYS.USER_ROLES,
    );

    if (cachedUserRoles) return cachedUserRoles;

    const userRoles = await this.userRoleQueryRepository.getUserRoles();

    await this.appCacheService.set(
      CACHE_KEYS.USER_ROLES,
      userRoles,
      this.cacheTtl,
    );

    return userRoles;
  }

  async getUserRole(id: string): Promise<DBUserRole> {
    return await this.userRoleQueryRepository.getUserRole(id);
  }

  async getUserRoleCached(id: string): Promise<DBUserRole> {
    const cacheKeyById = getCachedKeyById(id, CACHE_KEYS.USER_ROLES);

    const cachedUserRole =
      await this.appCacheService.get<DBUserRole>(cacheKeyById);

    if (cachedUserRole) return cachedUserRole;

    const userRole = await this.userRoleQueryRepository.getUserRole(id);

    await this.appCacheService.set(cacheKeyById, userRole, this.cacheTtl);

    return userRole;
  }

  async createUserRole(data: CreateUserRoleInput): Promise<DBUserRole> {
    const { title, managedGenres } = data;

    if (title === RoleEnum.ADMIN || title === RoleEnum.USER)
      throw new BadRequestException(
        'ADMIN and USER roles are default and created automatically',
      );

    if (title === RoleEnum.MANAGER && !managedGenres?.length)
      throw new BadRequestException(
        'For manager role managed genres should be specified',
      );

    return await this.userRoleRepository.createUserRole({
      title,
      managedGenres: managedGenres ? sanitizeGenres(managedGenres) : [],
    });
  }

  async deleteUserRole(id: string): Promise<DBUserRole> {
    const { title } = await this.getUserRole(id);

    if (title === RoleEnum.ADMIN || title === RoleEnum.USER)
      throw new BadRequestException(
        'ADMIN and USER roles are default and cannot be deleted',
      );

    return await this.userRoleRepository.deleteUserRoleWithCleanUp(id);
  }

  async addManagedGenres(id: string, genres: string[]): Promise<DBUserRole> {
    return await this.userRoleRepository.addManagedGenres(
      id,
      sanitizeGenres(genres),
    );
  }

  async removeManagedGenres(id: string, genres: string[]): Promise<DBUserRole> {
    return await this.userRoleRepository.removeManagedGenres(
      id,
      sanitizeGenres(genres),
    );
  }

  async assignUserRole(userId: string, roleId: string): Promise<DBUserRole> {
    if (!userId || !roleId)
      throw new BadRequestException(
        'Both userId and roleId should be specified',
      );

    return await this.userRoleRepository.assignUserRole(userId, roleId);
  }

  async unassignUserRole(userId: string, roleId: string): Promise<DBUserRole> {
    if (!userId || !roleId)
      throw new BadRequestException(
        'Both userId and roleId should be specified',
      );

    return await this.userRoleRepository.unassignUserRole(userId, roleId);
  }
}
