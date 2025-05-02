import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRoleQueryRepository } from './user-role.query-repository';
import { UserRoleRepository } from './user-role.repository';
import type { CreateUserRoleInput } from './dto/create-user-role.input';
import { RoleEnum, type UserRole } from 'prisma/generated/prisma';
import { sanitizeGenres } from 'src/common/utils/sanitizeGenres';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleQueryRepository: UserRoleQueryRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async getUserRoles(): Promise<UserRole[]> {
    return await this.userRoleQueryRepository.getUserRoles();
  }

  async getUserRole(id: string): Promise<UserRole> {
    return await this.userRoleQueryRepository.getUserRole(id);
  }

  async createUserRole(data: CreateUserRoleInput): Promise<UserRole> {
    const { title, managedGenres } = data;

    if (title === RoleEnum.MANAGER && !managedGenres?.length)
      throw new BadRequestException(
        'For manager role managed genres should be specified',
      );

    return await this.userRoleRepository.createUserRole({
      title,
      managedGenres: managedGenres ? sanitizeGenres(managedGenres) : [],
    });
  }

  async deleteUserRole(id: string): Promise<UserRole> {
    return await this.userRoleRepository.deleteUserRoleWithCleanUp(id);
  }

  async addManagedGenres(id: string, genres: string[]): Promise<UserRole> {
    return await this.userRoleRepository.addManagedGenres(
      id,
      sanitizeGenres(genres),
    );
  }

  async removeManagedGenres(id: string, genres: string[]): Promise<UserRole> {
    return await this.userRoleRepository.removeManagedGenres(
      id,
      sanitizeGenres(genres),
    );
  }

  async assignUserRole(userId: string, roleId: string): Promise<UserRole> {
    if (!userId || !roleId)
      throw new BadRequestException(
        'Both userId and roleId should be specified',
      );

    return await this.userRoleRepository.assignUserRole(userId, roleId);
  }

  async unassignUserRole(userId: string, roleId: string): Promise<UserRole> {
    if (!userId || !roleId)
      throw new BadRequestException(
        'Both userId and roleId should be specified',
      );

    return await this.userRoleRepository.unassignUserRole(userId, roleId);
  }
}
