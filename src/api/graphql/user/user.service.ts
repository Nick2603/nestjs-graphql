import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQueryRepository } from './user.query-repository';
import type { User } from 'prisma/generated/prisma';
import type { UpdateUserInput } from './dto/update-user.input';
import type { CreateUserInput } from './dto/create-user.input';
import { hashPassword } from 'src/common/utils/hash';
import type { UserWithRoles } from './interfaces/user-with-roles.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userQueryRepository.getUsers();
  }

  async getUser(id: string): Promise<User> {
    return await this.userQueryRepository.getUser(id);
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
