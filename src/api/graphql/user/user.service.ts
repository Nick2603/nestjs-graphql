import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQueryRepository } from './user.query-repository';
import type { User } from 'prisma/generated/prisma';
import type { UpdateUserInput } from './dto/update-user.input';
import type { CreateUserInput } from './dto/create-user.input';
import { hashPassword } from 'src/common/utils/hash';
import type { UserWithRoles } from './interfaces/user-with-roles.interface';
import { AppCacheService } from 'src/infrastructure/cache/app-cache.service';
import { CACHE_KEYS, getCachedKeyById } from 'src/infrastructure/casl';

@Injectable()
export class UserService {
  private readonly cacheTtl: number = 60_000;

  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userRepository: UserRepository,
    private readonly appCacheService: AppCacheService,
  ) {}

  async getUsersCached(): Promise<User[]> {
    const cachedUsers = await this.appCacheService.get<User[]>(
      CACHE_KEYS.USERS,
    );

    if (cachedUsers) return cachedUsers;

    const users = await this.userQueryRepository.getUsers();

    await this.appCacheService.set(CACHE_KEYS.USERS, users, this.cacheTtl);

    return users;
  }

  async getUser(id: string): Promise<User> {
    return await this.userQueryRepository.getUser(id);
  }

  async getUserCached(id: string): Promise<User> {
    const cacheKeyById = getCachedKeyById(id, CACHE_KEYS.USERS);

    const cachedUser = await this.appCacheService.get<User>(cacheKeyById);

    if (cachedUser) return cachedUser;

    const user = await this.userQueryRepository.getUser(id);

    await this.appCacheService.set(cacheKeyById, user, this.cacheTtl);

    return user;
  }

  async getUserWithRoles(id: string): Promise<UserWithRoles> {
    return await this.userQueryRepository.getUserWithRoles(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userQueryRepository.getUserByEmail(email);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const { password, ...rest } = data;

    const hashedPassword = await hashPassword(password);

    return await this.userRepository.createUserWithUserRole({
      ...rest,
      password: hashedPassword,
    });
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    if (!id) throw new BadRequestException('id must be specified');

    const { id: userId } = await this.getUser(id);

    if (data.password) data.password = await hashPassword(data.password);

    return await this.userRepository.updateUser(userId, data);
  }

  async deleteUser(id: string): Promise<User> {
    if (!id) throw new BadRequestException('id must be specified');

    const { id: userId } = await this.getUser(id);

    return await this.userRepository.deleteUserWithRoleCleanup(userId);
  }
}
