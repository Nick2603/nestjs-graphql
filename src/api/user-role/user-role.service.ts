import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRoleQueryRepository } from './user-role.query-repository';
import { UserRoleRepository } from './user-role.repository';
import type { CreateUserRoleInput } from './dto/create-user-role.input';
import type { UserRole } from 'prisma/generated/prisma';

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
    return await this.userRoleRepository.createUserRole(data);
  }

  async deleteUserRole(id: string): Promise<UserRole> {
    return await this.userRoleRepository.deleteUserRoleWithCleanUp(id);
  }

  async addManagedGenres(id: string, genres: string[]): Promise<UserRole> {
    const sanitizedGenres = genres
      .map((genre) => genre.trim().toLowerCase())
      .filter(Boolean);

    return await this.userRoleRepository.addManagedGenres(id, sanitizedGenres);
  }

  async removeManagedGenres(id: string, genres: string[]): Promise<UserRole> {
    const sanitizedGenres = genres
      .map((genre) => genre.trim().toLowerCase())
      .filter(Boolean);

    return await this.userRoleRepository.removeManagedGenres(
      id,
      sanitizedGenres,
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
